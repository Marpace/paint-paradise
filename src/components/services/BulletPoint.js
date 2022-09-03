import {EditContext} from "../cms/CMS";
import {useContext, useState, useEffect} from "react";


function BulletPoint(props) {

  const context = useContext(EditContext);
  const [editState, setEditState] = useState(false)
  const [elementState, setElementState] = useState(undefined);

  useEffect(() => {
      setEditState(context.element === elementState ? true : false)
  }, [context])

  function editContent(e) {
      if(!context.editingModeOn) return;
      context.editContent(e.target.innerHTML, e.target, props.contentId)
      setElementState(e.target)
  }

  return (
    <div className="bullet-point">
      <div className="bullet-point__circle"></div>
      <p onClick={editContent} className={context.editingModeOn ? "editable" : ""}>{editState ? context.textValue : props.text}</p>
    </div>
  )
}

export default BulletPoint;