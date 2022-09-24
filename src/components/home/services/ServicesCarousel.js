import CarouselControls from "../../CarouselControls";
import SectionHeader from "../../SectionHeader";
import ServicesCard from "./ServicesCard";
import {useContext, useEffect, useState} from "react";
import {CMSContext} from "../../cms/CMS"
import {homeTextContext} from "../Home";


function ServicesCarousel(props) {
  
  //content
  const homeContext = useContext(homeTextContext);
  const [headingText, setHeadingText] = useState({});
  const [cardTitles, setCardTitles] = useState([]);
  const [cardTexts, setCardTexts] = useState([]);
  const [cardButtons, setCardButtons] = useState([]);
  const [serviceCardLinks, setServiceCardLinks] = useState([
    "/Services/private-paint-parties",
    "/Services/paint-night",
    "/Services/paint-kits"
  ])

  //CMS
  const context = useContext(CMSContext)
  const [selectedImg, setSelectedImg] = useState();

  const [cardPositions, setCardPositions] = useState(["left", "middle", "right"]);
  const [activeImg, setActiveImg] = useState(undefined);
  const [imgIndex, setImgIndex] = useState(1)
 
  useEffect(() => {
    const headingContent = homeContext.find(
      e => e.type.name === "heading" && e.location.section === "services"
      )
    setHeadingText(headingContent);
    setCardTitles(sortContent(homeContext, "title", "services"));
    setCardTexts(sortContent(homeContext, "text", "services"));
    setCardButtons(sortContent(homeContext, "button", "services"));
    setActiveImg(props.carouselImages[0])
  }, [homeContext])

  useEffect(() => {
    setActiveImg(props.carouselImages.find( e => e.order === imgIndex))
  }, [imgIndex])


  function sortContent(arr, typeName, section) {
    const content = arr.filter( e => {
      return e.type.name === typeName && e.location.section === section;
    })
    return content;
  }

  function handleEditImage(e) {
    context.editImage(e.target.id)
    setSelectedImg(e.target.id)
  }

  function rotateCardsLeft() {
    setCardPositions(prev => {
      prev.unshift(prev.pop())
      return prev
    })
    setImgIndex(imgIndex === 1 ? 3 : imgIndex -1)
  }
  
  function rotateCardsRight() {
    setCardPositions(prev => {
      prev.push(prev.shift());
      return prev
    })
    setImgIndex(imgIndex === 3 ? 1 : imgIndex + 1)
  }

  if(cardTitles.length > 0) {
    if(!context.editingModeOn) {
      return (
        <section className="services">
        <SectionHeader
          tilt="left"
          title={headingText.content}
          contentId={headingText._id}
        />
        <div className="services-wrap">
          <div className={`services-img `}>
          <img className="services-img__img" src={activeImg ? activeImg.path : "#"}></img>
            <ServicesCard
              title={cardTitles[0].content}
              titleId={cardTitles[0]._id}
              text={cardTexts[0].content}
              textId={cardTexts[0]._id}
              button={cardButtons[0].content}
              buttonId={cardButtons[0]._id}
              position={cardPositions[1]}
              path={serviceCardLinks[0]}
            />
            <ServicesCard
              title={cardTitles[2].content}
              titleId={cardTitles[2]._id}
              text={cardTexts[2].content}
              textId={cardTexts[2]._id}
              button={cardButtons[2].content}
              buttonId={cardButtons[2]._id}
              position={cardPositions[2]}
              path={serviceCardLinks[1]}
            />
            <ServicesCard
              title={cardTitles[1].content}
              titleId={cardTitles[1]._id}
              text={cardTexts[1].content}
              textId={cardTexts[1]._id}
              button={cardButtons[1].content}
              buttonId={cardButtons[1]._id}
              position={cardPositions[0]}
              path={serviceCardLinks[2]}
            />
          </div>
          <CarouselControls
            rotateCardsLeft={rotateCardsLeft}
            rotateCardsRight={rotateCardsRight}
            infinite={true}
          />
        </div>
      </section>
      )
    }
    //Render this if edit mode is on
    return (
      <section className="services">
        <SectionHeader
          tilt="left"
          title="Our services"
        />
        <div className="services-wrap services-editable">
          <div className={`services-img`}>
          <img 
          className="services-img__img" 
          src={
              selectedImg === props.carouselImages[0]._id
              ? context.previewImgUrl === undefined ? props.carouselImages[0].path : context.previewImgUrl 
              : props.carouselImages[0].path
            }></img>
          <div onClick={handleEditImage} id={props.carouselImages[0]._id} className="edit-icon">
            <img id={props.carouselImages[0]._id} className="edit-icon__icon" src="./images/cms/edit_icon.png"></img>
          </div>
            <ServicesCard
              title={cardTitles[0].content}
              titleId={cardTitles[0]._id}
              text={cardTexts[0].content}
              textId={cardTexts[0]._id}
              button={cardButtons[0].content}
              buttonId={cardButtons[0]._id}
              position="middle"
              path=""
            />
          </div>
          <div className={`services-img`}>
          <img 
            className="services-img__img" 
            src={
              selectedImg === props.carouselImages[1]._id 
              ? context.previewImgUrl === undefined ? props.carouselImages[1].path : context.previewImgUrl 
              : props.carouselImages[1].path
            }></img>
            <div onClick={handleEditImage} id={props.carouselImages[0]._id} className="edit-icon">
              <img id={props.carouselImages[1]._id} className="edit-icon__icon" src="./images/cms/edit_icon.png"></img>
            </div>
            <ServicesCard
              title={cardTitles[1].content}
              titleId={cardTitles[1]._id}
              text={cardTexts[1].content}
              textId={cardTexts[1]._id}
              button={cardButtons[1].content}
              buttonId={cardButtons[1]._id}
              position="middle"
              path=""
            />
          </div>
          <div className={`services-img`}>
          <img 
            className="services-img__img" 
            src={
              selectedImg === props.carouselImages[2]._id 
              ? context.previewImgUrl === undefined ? props.carouselImages[2].path : context.previewImgUrl 
              : props.carouselImages[2].path
            }></img>
            <div onClick={handleEditImage} id={props.carouselImages[2]._id} className="edit-icon">
              <img id={props.carouselImages[2]._id} className="edit-icon__icon" src="./images/cms/edit_icon.png"></img>
            </div>
            <ServicesCard
              title={cardTitles[2].content}
              titleId={cardTitles[2]._id}
              text={cardTexts[2].content}
              textId={cardTexts[2]._id}
              button={cardButtons[2].content}
              buttonId={cardButtons[2]._id}
              position="middle"
              path=""
            />
          </div>
        </div>
      </section>
    )
  }
}



export default ServicesCarousel;