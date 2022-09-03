
import {EditContext} from "./cms/CMS"
import { useContext, useEffect, useState } from "react";



function PurpleButton(props) {
  
  const context = useContext(EditContext);
  const [editState, setEditState] = useState(false)
  const [elementState, setElemenetState] = useState(undefined);

  useEffect(() => {
    setEditState(context.element === elementState ? true : false)
  }, [context])


  function handleClick(e) {
    if(context.editingModeOn){
      context.editContent(e.target.innerHTML, e.target, props.contentId)
      setElemenetState(e.target)
    } 
  }

  return (
    <button 
      onClick={handleClick} 
      className={`purple-button ${context.editingModeOn ? "editable" : ""}`}>
    {editState ? context.textValue : props.buttonText}
    </button>
  )
}

export default PurpleButton;