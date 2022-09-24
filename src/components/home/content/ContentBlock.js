import { useContext, useEffect, useState } from "react";
import {CMSContext} from "../../cms/CMS"
import Paragraph from "../../Paragraph";
import Image from "../../Image"



function ContentBlock(props) {


  const context = useContext(CMSContext)
  const [titleEditState, setTitleEditState] = useState(false)
  const [titleElementState, setTitleElementState] = useState(undefined);
  const [textElementState, setTextElementState] = useState(undefined);


  useEffect(() => {
    setTitleEditState(context.element === titleElementState ? true : false)
  }, [context])
  
  function editTitleContent(e) {
    if(!context.editingModeOn) return;
    setTitleElementState(e.target)
    context.editContent(e.target.innerHTML, e.target, props.titleContentId)
  }

  return (
    <div className="content-item">
      {/* <div className="content-item__icon item-icon-1"> */}
      <Image 
        image={props.image}
        className="content-item__icon item-icon-1"
      />
        {/* <img className="content-item__icon-img" src={props.imageSrc} alt=""></img> */}
      {/* </div> */}
      <h2 
        onClick={editTitleContent} 
        className={`content-item__title ${context.editingModeOn ? "editable" : ""}`}>
      {titleEditState ? context.textValue : props.title}
      </h2>
      <Paragraph 
        id={props.textContentId}
        content={props.text}
        className="content-item__text"
      />
    </div>
  )
}


export default ContentBlock;