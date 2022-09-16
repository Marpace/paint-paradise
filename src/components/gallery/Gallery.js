import { useState, useContext, useEffect } from "react";
import ImageModal from "../ImageModal";
import Grid from "./Grid";
import { UrlContext } from "../App";
import LoadingScreen from "../LoadingScreen";

function Gallery() {

  const [modalOpen, setModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const [contentLoaded, setContentLoaded] = useState(false)
  const [images, setImages] = useState([]);
  const urlContext = useContext(UrlContext);

  useEffect(() => {
    getImages();
  }, [])


  function getImages(){
    fetch(`${urlContext.baseUrl}/get-gallery-image-content`)
    .then( res => res.json())
    .then( data => {
      setImages(data.content);
      setContentLoaded(true);
    })
    .catch( err => console.log(err))
  }

  function toggleModal(url) {
    setModalOpen(modalOpen ? false : true)
    setImgUrl(url)
  }

  if(contentLoaded) {
    return (
      <div className="gallery">
        <Grid 
          images={images}
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