import {EditContext} from "./cms/CMS"
import {useState, useContext} from "react";


function CarouselControls(props) {
  
  const context = useContext(EditContext)
  const [activeSelector, setActiveSelector] = useState(1);

  function handleLeftClick() {
    props.rotateCardsLeft()
    setActiveSelector( () => {
      if(props.infinite) {
        return activeSelector === 1 ? 3 : activeSelector - 1
      } else {
        return activeSelector === 1 ? 1 : activeSelector - 1
      }
    })
    // setActiveSelector(activeSelector === 1 ? 3 : activeSelector - 1)
  }
  function handleRightClick() {
    props.rotateCardsRight()
    setActiveSelector( () => {
      if(props.infinite) {
        return activeSelector === 3 ? 1 : activeSelector + 1
      } else {
        return activeSelector === 3 ? 3 : activeSelector + 1
      }
    })
    // setActiveSelector(activeSelector === 3 ? 1 : activeSelector + 1)
  }



  return (
    <div className={`controls ${context.editingModeOn ? "hidden" : ""}`}>
      <div className="selectors serv-selectors">
        <div className={activeSelector === 1 ? "selector-active" : ""}></div>
        <div className={activeSelector === 2 ? "selector-active" : ""}></div>
        <div className={activeSelector === 3 ? "selector-active" : ""}></div>
      </div>
      <div className="arrows">
        <div id="left" onClick={handleLeftClick} className="arrow-left serv-prev-btn">
          <img src="./images/carousel/arrow_left.png" alt="carousel arrow left"></img>
        </div>
        <div id="right" onClick={handleRightClick} className="arrow-right serv-next-btn">
          <img src="./images/carousel/arrow_right.png" alt="carousel arrow right"></img>
        </div>
      </div>
    </div>
  )
}


export default CarouselControls;