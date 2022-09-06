import CarouselControls from "../CarouselControls";
import SectionHeader from "../SectionHeader";
import ImageModal from "../ImageModal";
import Paragraph from "../Paragraph";
import Image from "../Image";
import {useState, useContext} from "react";
import { EditContext } from "../cms/CMS";

function AboutInstagram(props) {

  const [modalOpen, setModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [imgPositions, setImgPositions] = useState(["left", "middle", "right"])
  const [position, setPosition] = useState(3)
  const context = useContext(EditContext)
  const images = [
    [props.images[0], props.images[1], props.images[2]],
    [props.images[3], props.images[4], props.images[5]],
    [props.images[6], props.images[7], props.images[8]],
  ]

  function moveRight() {
    setPosition( prev => {
      return prev === 1 ? 1 : prev - 1;
    })
  }
  function moveLeft() {
    setPosition( prev => {
      return prev === 3 ? 3 : prev + 1;
    })
  }


  function closeModal() {
    setModalOpen(false)
  }

  function toggleModal(url) {
    setImgUrl(url)
    
  }

  return (
    <section className="about-instagram">
      <div className="about-instagram__heading">
        <SectionHeader
          tilt="right"
          title={props.heading.content}
          contentId={props.heading._id}
        />
        <Paragraph 
          id={props.title._id}
          content={props.title.content}
          className="font-medium"
        />
      </div>
      <div className="about-instagram__carousel">
        <div className={`instagram-carousel-inner ${context.editingModeOn ? "carousel-editable" : ""}`}>
            <div className={`ghost ${context.editingModeOn ? "hidden" : ""}`}></div>
            <div className={`carousel-images insta-${position === 3 ? imgPositions[1] : imgPositions[0]} ${context.editingModeOn ? "insta-editable" : ""}`}>
              {images[0].map(image => (
                <Image 
                  key={image._id}
                  image={image}
                  className="carousel-images__image"
                />
              ))}
            </div>
            <div className={`carousel-images insta-${imgPositions[position - 1]} ${context.editingModeOn ? "insta-editable" : ""}`}>
              {images[1].map(image => (
                <Image 
                  key={image._id}
                  image={image}
                  className="carousel-images__image"
                />
              ))}
            </div>
            <div className={`carousel-images insta-${position === 1 ? imgPositions[1] : imgPositions[2]} ${context.editingModeOn ? "insta-editable" : ""}`}>
              {images[2].map(image => (
                <Image 
                  key={image._id}
                  image={image}
                  className="carousel-images__image"
                />
              ))}
            </div>
          </div>
        <CarouselControls 
          rotateCardsLeft={moveLeft}
          rotateCardsRight={moveRight}
          infinite={false}
        />
      </div>
      <ImageModal 
        closeModal={closeModal}
        imgUrl={imgUrl}
      />
    </section>
  )
}

export default AboutInstagram;