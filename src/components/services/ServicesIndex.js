import ServicesSection from "./ServicesSection";
import {ServicesContext} from "./Services";
import { useContext, useEffect, useState } from "react";

function ServicesIndex() {

  const servicesContent = useContext(ServicesContext)
  const [titles, setTitles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [images, setImages] = useState([]);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setTitles(sortContent(servicesContent, "heading"))
    setTexts(sortContent(servicesContent, "text"))
    setButtons(sortContent(servicesContent, "button"))
    setImages(sortContent(servicesContent, "image"))
    setContentLoaded(true)
  }, [servicesContent])

  function sortContent(arr, typeName) {
    const sortedArray = arr.filter( item => {
      return item.type.name === typeName
    })
    return sortedArray.sort((a, b) => a.order - b.order);
  }


  if(contentLoaded) {
    return (
      <div>
        <ServicesSection 
          title={titles[0]}
          tilt="left"
          description={texts[0]}
          button={buttons[0]}
          image={images[0]}
          path="private-paint-parties"
        />
        {/* <ServicesSection 
          title={titles[1]}
          tilt="right"
          description={texts[1]}
          button={buttons[3]}
          image={images[1]}
          path="paint-night"
        /> */}
        <ServicesSection 
          title={titles[1]}
          tilt="left"
          description={texts[1]}
          button={buttons[1]}
          image={images[1]}
          path="paint-kits"
        />
      </div>
    )
  }
}

export default ServicesIndex;