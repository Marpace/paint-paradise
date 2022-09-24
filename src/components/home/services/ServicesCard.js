import PurpleButton from "../../PurpleButton";
import {CMSContext} from "../../cms/CMS";
import {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import Paragraph from "../../Paragraph";

function ServicesCard(props) {

  const context = useContext(CMSContext);
  const [titleEditState, setTitleEditState] = useState(false);

  const [titleElementState, setTitleElementState] = useState(undefined);

  useEffect(() => {
    setTitleEditState(context.element === titleElementState ? true : false);
  }, [context])



  function editTitleContent(e) {
    if(!context.editingModeOn) return;
    setTitleElementState(e.target)
    context.editContent(e.target.innerHTML, e.target, props.titleId)
  }

  return (
    <div id="card-1" className={`services-card ${props.position}-card`}>
      <h2 
        onClick={editTitleContent} 
        className={`card-title ${context.editingModeOn ? "editable" : ""}`}>
      {titleEditState ? context.textValue : props.title}
      </h2>
      <Paragraph 
        id={props.textId}
        content={props.text}
        className="service-card-text"
      />
      <Link to={context.editingModeOn ? "" : props.path}>
        <PurpleButton
          buttonText={props.button}
          textValue={context.textValue}
          contentId={props.buttonId}
        />
      </Link>
    </div>
  )
}

export default ServicesCard;