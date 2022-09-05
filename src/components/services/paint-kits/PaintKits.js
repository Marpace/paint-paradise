import PaintKitSection from "./PaintKitSection";
import SitePath from "../SitePath";
import {useEffect, useContext, useState} from "react"
import GetPaintKit from "./GetPaintKit";
import {UrlContext} from "../../App";
import LoadingScreen from "../../LoadingScreen";

function PaintKits() {

  const urlContext = useContext(UrlContext);
  const [headings, setHeadings] = useState([]);
  const [texts, setTexts] = useState([]);
  const [regularBulletPoints, setRegularBulletPoints] = useState([]);
  const [kidsBulletPoints, setKidsBulletPoints] = useState([]);
  const [sectionImages, setSectionImages] = useState([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [kitImages, setKitImages] = useState([]);

  useEffect(() => {
    getContent();
    document.body.scrollTo(0, 0)
  }, [])

  function getContent(){
    fetch(`${urlContext.baseUrl}/get-paint-kits-text-content`)
    .then( res => res.json())
    .then( data => {
      setHeadings(sortContent(data.content, "heading"))
      setTexts(sortContent(data.content, "text"))
      setRegularBulletPoints(sortSectionContent(sortContent(data.content, "bullet-point"), "regular-paint-kits") )
      setKidsBulletPoints(sortSectionContent(sortContent(data.content, "bullet-point"), "kids-paint-kits") )
      return fetch(`${urlContext.baseUrl}/get-paint-kits-image-content`)
    })
    .then( res => res.json())
    .then(data => {
      setSectionImages(data.content.filter(e => e.location.section !== "get-paint-kit"))
      setKitImages(sortSectionContent(sortContent(data.content, "image"), "get-paint-kit"))
      setContentLoaded(true);
    })
    .catch( err => console.log(err))
  }

  function sortContent(arr, typeName){
    const sortedArray = arr.filter( e => {
      return e.type.name === typeName
    }).sort((a, b) => a.order - b.order)
    return sortedArray;
  }

  function sortSectionContent(arr, section){
    const sortedArray = arr.filter(e => {
      return e.location.section === section
    }).sort((a, b) => a.order - b.order)
    return sortedArray;
  }


  const kits = [
    {
      src: "/images/services/paint_kits/get_kit_1.png",
      alt: "Aurora Borealis with pine trees"
    },
    {
      src: "/images/services/paint_kits/get_kit_2.png",
      alt: "Woman swinging from palm tree at the beach"
    },
    {
      src: "/images/services/paint_kits/get_kit_3.png",
      alt: "Bottle of champagne and two glasses"
    },
    {
      src: "/images/services/paint_kits/get_kit_4.png",
      alt: "Two birds kissing in front of sunset"
    },
    {
      src: "/images/services/paint_kits/get_kit_5.png",
      alt: "Three cactus plants in pots"
    },
    {
      src: "/images/services/paint_kits/get_kit_6.png",
      alt: "Two flamingos forming a heart shape"
    }
  ]

  if(contentLoaded) {
    return (
      <div className="paint-kits">
      <SitePath 
        location="Paint Kits"
      />
      <PaintKitSection 
        heading={headings[0]}
        description={texts[0]}
        bulletPoints={regularBulletPoints}
        image={sectionImages[0]}
      />
      <PaintKitSection 
        heading={headings[1]}
        description={texts[1]}
        bulletPoints={kidsBulletPoints}
        image={sectionImages[1]}
      />
      <div className="get-paint-kit-container">
        {kitImages.map(item => (
          <GetPaintKit 
            key={item._id}
            image={item}
          />
        ))}
      </div>
    </div>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
}


export default PaintKits;