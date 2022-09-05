import SitePath from "../SitePath";
import PrivatePartiesSection from "./PrivatePartiesSection";
import React, { useContext, useEffect, useState } from "react";
import { UrlContext } from "../../App";
import LoadingScreen from "../../LoadingScreen";



function PrivateParties() {

  const [sectionContent, setSectionContent] = useState([])
  const [text, setText] = useState([])
  const [images, setImages] = useState([]);
  const urlContext = useContext(UrlContext)
  const [contentLoaded, setContentLoaded] = useState(false)

  useEffect(() => {
    getContent();
    document.body.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if(images.length > 0){
      setSectionContent([
        {
          heading: sortContent(text, "heading")[0],
          text: sortContent(text, "text")[0],
          bulletPoints: sort(text, "kids-parties", "bullet-point"),
          images: sort(images, "kids-parties", "image")
        },
        {
          heading: sortContent(text, "heading")[1],
          text: sortContent(text, "text")[1],
          bulletPoints: sort(text, "special-occasions", "bullet-point"),
          images: sort(images, "special-occasions", "image")
        },
        {
          heading: sortContent(text, "heading")[2],
          text: sortContent(text, "text")[2],
          bulletPoints: sort(text, "corporate-events", "bullet-point"),
          images: sort(images, "corporate-events", "image")
        },
      ])
      setContentLoaded(true)
    }
  }, [images, text])

  function getContent() {
    fetch(`${urlContext.baseUrl}/get-private-paint-parties-text-content`)
    .then( res => res.json())
    .then( data => {
      setText(data.content)
      // return  image content fetch here 
      return fetch(`${urlContext.baseUrl}/get-private-paint-parties-image-content`)
    })
    .then(res => res.json())
    .then( data => {
      setImages(data.content)
    })
    .catch( err => console.log(err))
  }

  function sortContent(arr, typeName) {
    const sortedArray = arr.filter( item => {
      return item.type.name === typeName
    })
    return sortedArray.sort((a, b) => a.order - b.order);
  }

  function sort(arr, section, typeName){
    const sortedArray = arr.filter( item => {
      return item.location.section === section && item.type.name === typeName
    })
    return sortedArray.sort((a, b) => a.order - b.order);
  }


  if(contentLoaded) {
    return (
        <div className="private-parties">
          <SitePath />
          {sectionContent.map( item => (
          <PrivatePartiesSection 
            key={item.heading._id}
            heading={item.heading}
            text={item.text}
            bulletPoints={item.bulletPoints}
            images={item.images}
          />
          ))}
        </div>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
}
export default PrivateParties;