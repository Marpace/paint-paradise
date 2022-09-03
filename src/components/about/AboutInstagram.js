import CarouselControls from "../CarouselControls";
import SectionHeader from "../SectionHeader";
import {useState} from "react";
import ImageModal from "../ImageModal";
import Paragraph from "../Paragraph";

function AboutInstagram(props) {

  const [modalOpen, setModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [imgPositions, setImgPositions] = useState(["left", "middle", "right"])

  function rotateLeft(){
    const arr = [...imgPositions];
    arr.unshift(arr.pop());
    setImgPositions(arr)
  }
  function rotateRight(){
    const arr = [...imgPositions];
    arr.push(arr.shift());
    setImgPositions(arr)
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
        {/* <p className="font-medium">@crazy_about_colour</p> */}
        <Paragraph 
          id={props.title._id}
          content={props.title.content}
          className="font-medium"
        />
      </div>
      <div className="about-instagram__carousel">
        <div className="instagram-carousel-inner">
          <img className={`instagram-carousel-inner__img ${imgPositions[0]}-img`} src="/images/about/insta-1.jpg" alt=""></img>
          <img className={`instagram-carousel-inner__img ${imgPositions[1]}-img`} src="/images/about/insta-2.jpg" alt=""></img>
          <img className={`instagram-carousel-inner__img ${imgPositions[2]}-img`} src="/images/about/insta-3.jpg" alt=""></img>
          {/* <img className="instagram-carousel-inner__img" src="./images/about/insta-4.jpg" alt=""></img>
          <img className="instagram-carousel-inner__img" src="./images/about/insta-5.jpg" alt=""></img> */}
        </div>
        <CarouselControls 
          rotateCardsLeft={rotateLeft}
          rotateCardsRight={rotateRight}
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