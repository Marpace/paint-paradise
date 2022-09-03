import {EditContext} from "./cms/CMS"
import {useContext, useEffect, useState} from "react";


function Paragraph(props) {

  const context = useContext(EditContext);
  const [elementState, setElementState] = useState();
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    setEditState(context.element === elementState ? true : false)
  }, [context])

  function editContent(e) {
    if(!context.editingModeOn) return;
    context.editContent(e.target.innerHTML, e.target, e.target.id)
    setElementState(e.target)
  }

  return (
    <p id={props.id} onClick={editContent} className={`${props.className} ${context.editingModeOn ? "editable" : ""}`}>
      {editState ? context.textValue : props.content}
    </p>
  )
}

export default Paragraph;