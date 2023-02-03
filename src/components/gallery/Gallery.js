import { useState, useContext, useEffect, useRef } from "react";
import ImageModal from "../ImageModal";
import Grid from "./Grid";
import { UrlContext } from "../App";
import LoadingScreen from "../LoadingScreen";
import GalleryOption from "./GalleryOption";

function Gallery() {

  const gridRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false)
  const [images, setImages] = useState([]);
  const [gridImages, setGridImages] = useState([]);
  const urlContext = useContext(UrlContext);

  useEffect(() => {
    getImages();
  }, [])


  function getImages(){
    fetch(`${urlContext.baseUrl}/get-gallery-image-content`)
    .then( res => res.json())
    .then( data => {
      // an array of the different sections (folders)
      const sections = data.content
      .map((item) => item.location.section)
      .filter((value, index, self) => self.indexOf(value) === index);

      sections.forEach(section => {
        setImages(prev => {
          return [...prev, {
            section: section,
            optionImages: sortContent(data.content, section).splice(0, 5),
            gridImages: sortContent(data.content, section)
          }]
        })
      })
      setContentLoaded(true);
    })
    .catch( err => console.log(err))
  }


  function toggleModal(url) {
    setModalOpen(modalOpen ? false : true)
    setImgUrl(url)
  }

  function scrollToGrid() {
    setTimeout(() => {
      gridRef.current.scrollIntoView({behavior: "smooth"});
    }, 50);
  }

  function sortContent(arr, section) {
    const sortedArray = arr.filter( item => {
      return item.location.section === section
    })
    return sortedArray.sort((a, b) => a.order - b.order);
  }

  useEffect(() => {
    console.log(gridImages)
  }, [gridImages, contentLoaded])

  if(contentLoaded) {
    return (
      <div className="gallery">
        {images.map(item => (
          <GalleryOption 
            key={item.optionImages[0]._id}
            sectionTitle={item.section}
            images={item.optionImages} 
            gridImages={item.gridImages}
            setGridImages={setGridImages}
            scrollToGrid={scrollToGrid}
          />
        ))}
        <hr ref={gridRef} className="gallery-hr"></hr>
        <Grid 
          images={gridImages} 
          toggleModal={toggleModal}
        />
        <ImageModal 
          modalOpen={modalOpen}
          imgUrl={imgUrl}
          toggleModal={toggleModal}
        />
      </div>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
}

export default Gallery;