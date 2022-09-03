import { useState } from "react";
import ImageModal from "../ImageModal";
import Grid from "./Grid";

function Gallery() {

  const [modalOpen, setModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  function toggleModal(url) {
    setModalOpen(modalOpen ? false : true)
    setImgUrl(url)
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className="gallery">
      <Grid toggleModal={toggleModal}/>
      <ImageModal 
        modalOpen={modalOpen}
        imgUrl={imgUrl}
        closeModal={closeModal}
      />
    </div>
  )
}

export default Gallery;