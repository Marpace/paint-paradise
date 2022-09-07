import {EditContext} from "./cms/CMS";
import {useContext} from "react";


function GalleryImage(props) {

  const context = useContext(EditContext);

  function editImage(e){
    if(!context.editingModeOn) return;
    context.editImage(e.target.id)
  }


  return (
    <div className={props.className} >
      <img className="editable-image" src={
        context.selectedImage === props.image._id
        ? context.previewImgUrl === undefined ? props.image.path : context.previewImgUrl 
        : props.image.path
      }></img>
      <div id={props.image._id} onClick={editImage} className="edit-icon">
        <img id={props.image._id} className="edit-icon__icon" src="/images/cms/edit_icon.png"></img>
      </div>
    </div>
  )
}

export default GalleryImage