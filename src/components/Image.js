import {CMSContext} from "./cms/CMS";
import {useContext, useState} from "react";
import {useLocation} from "react-router-dom";

function Image(props) {

  const [imageSelected, setImageSelected] = useState(false);

  const context = useContext(CMSContext);
  const location = useLocation().pathname


  function editImage(e){
    if(!context.editingModeOn) return;
    context.editImage(e.target.id)
  }

  function handleClick(e) {
    if(context.editingModeOn) {
      if(!location.includes("Gallery") || !context.chooseImages) return;
      setImageSelected(imageSelected ? false : true);
      context.pushId(e.target.id);
    } else {
      props.toggleModal(props.image.path);
    }
  }

  return(
    <div onClick={handleClick} className={props.className + ` ${imageSelected && context.chooseImages ? "selected-image" : ""}`} >
      <img id={props.image.googleId} className={`editable-image ${context.chooseImages ? "selectable-image" : ""}`} src={
        context.selectedImage === props.image._id && context.previewImgUrl !== undefined
        ? context.previewImgUrl 
        : props.image.path
      }></img>
      <div id={props.image._id} onClick={editImage} className={`edit-icon ${context.chooseImages ? "hidden" : ""}`}>
        <img id={props.image._id} className="edit-icon__icon" src="./images/cms/edit_icon.png"></img>
      </div>
    </div>
  )
}

export default Image;


