import AboutHeader from "./AboutHeader";
import AboutInstagram from "./AboutInstagram";
import {UrlContext} from "../App";
import {useContext, useEffect, useState} from "react";
import LoadingScreen from "../LoadingScreen";


function About() {

  const urlContext = useContext(UrlContext);
  const [headerImage, setHeaderImage] = useState();
  const [instaImages, setInstaImages] = useState([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [headings, setHeadings] = useState([]);
  const [titles, setTitles] = useState([]);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    getContent();
  }, [])

  function getContent(){
    fetch(`${urlContext.baseUrl}/get-about-text-content`)
    .then( res => res.json())
    .then( data => {
      setHeadings(data.content.filter(e => e.type.name === "heading"))
      setTitles(data.content.filter(e => e.type.name === "title"))
      setTexts(data.content.filter(e => e.type.name === "text"))
      
      return fetch(`${urlContext.baseUrl}/get-about-image-content`)
    })
    .then( res => res.json())
    .then( data => {
      setHeaderImage(data.content.find(e => e.location.section === "header"))
      setInstaImages(data.content.filter(e => e.location.section === "instagram"))
      setContentLoaded(true)
    })
    .catch( err => console.log(err))
  }

  if(contentLoaded) {
    return (
      <div className="about">
        <AboutHeader
          heading={headings[0]}
          title={titles[0]}
          texts={texts}
          image={headerImage}
        />
        <AboutInstagram 
          heading={headings[1]}
          title={titles[1]}
          images={instaImages}
        />
      </div>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
}


export default About;