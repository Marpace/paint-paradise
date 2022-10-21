import BookNow from "../BookNow";
import Content from "./content/Content";
import Hero from "./Hero";
import ServicesCarousel from "./services/ServicesCarousel";
import TestimonialsCarousel from "./testimonials/TestimonialsCarousel";

import {UrlContext} from "../App"
import { useContext, useEffect, useState } from "react";
import React from "react";
import LoadingScreen from "../LoadingScreen";

export const homeTextContext = React.createContext();

function Home() {

  const urlContext = useContext(UrlContext);
  const [homeContent, setHomeContent] = useState([]);
  const [bookNowTitle, setBookNowTitle] = useState({});
  const [bookNowButton, setBookNowButton] = useState({});
  const [carouselImages, setCarouselImages] = useState([]);
  const [contentImages, setContentImages] = useState([]);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    getHomeContent();
  }, [])

  function getHomeContent() {
    fetch(`${urlContext.baseUrl}/get-home-text-content`)
    .then( res => res.json())
    .then( data => {
      const title = data.content.find( e => e.type.name === "heading" && e.location.page === "home" && e.location.section === "book now")
      const button = data.content.find( e => e.type.name === "button" && e.location.page === "home" && e.location.section === "book now")
      setHomeContent( prev => {
        return [...prev, ...data.content]
      });
      setBookNowTitle(title);
      setBookNowButton(button);
      return fetch(`${urlContext.baseUrl}/get-home-image-content`)
    })
    .then( res => res.json())
    .then( data => {
      setCarouselImages(sortContent(data.content, "services"))
      setContentImages(sortContent(data.content, "content"))
      setHomeContent( prev => {
        return [...prev, ...data.content]
      })
      setContentLoaded(true);
      
    })
    .catch( err => console.log(err))
  }

  function sortContent(arr, section){
    const sortedArray = arr.filter( e => e.location.section === section).sort((a,b) => a.order - b.order);
    return sortedArray;
  }

  if(contentLoaded) {
    return (
      <homeTextContext.Provider value={homeContent}>
        <div className="home">
          <Hero />
          <Content 
            images={contentImages}
          />
          <ServicesCarousel 
            carouselImages={carouselImages}  
          />
          <TestimonialsCarousel 
          />
          <BookNow 
            title={bookNowTitle}
            button={bookNowButton}
          />
        </div>
      </homeTextContext.Provider>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
}

export default Home;

