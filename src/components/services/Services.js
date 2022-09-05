import {Outlet} from "react-router-dom";
import React, { useEffect, useState, useContext } from "react"
import { UrlContext } from "../App";
import LoadingScreen from "../LoadingScreen";

export const ServicesContext = React.createContext();


function Services() {

  const urlContext = useContext(UrlContext);
  const [servicesContent, setServicesContent] = useState([]);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    getServicesContent();
  }, [])


  function getServicesContent() {
    fetch(`${urlContext.baseUrl}/get-services-text-content`)
    .then( res => res.json())
    .then( data => {
      setServicesContent( prev => {
          return [...prev, ...data.content]
      })
      return fetch(`${urlContext.baseUrl}/get-services-image-content`)
    })
    .then( res => res.json())
    .then( data => {
      setServicesContent( prev => {
        return [...prev, ...data.content]
      })
      setContentLoaded(true)
    })
    .catch( err => console.log(err))
  }


  if(contentLoaded) {
    return (
      <ServicesContext.Provider value={servicesContent}>
        <Outlet/>
      </ServicesContext.Provider>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
}

export default Services;