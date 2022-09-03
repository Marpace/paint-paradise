import {EditContext} from "../../cms/CMS"
import {useContext} from "react";
import Paragraph from "../../Paragraph";

function TestimonialsCard(props) {

  const context = useContext(EditContext)

  return (
    <div className={`testimonial-card test-${props.position} ${context.editingModeOn ? "testimonial-card-editable" : ""}`}>
      <div className="card-title">
        <h2>★★★★★</h2>
      </div>
        <Paragraph 
          id={props.textId}
          content={props.text}
          className="card-text"
        />
        <Paragraph 
          id={props.authorId}
          content={props.author}
          className="card-author"
        />
    </div>
  )
}


export default TestimonialsCard;