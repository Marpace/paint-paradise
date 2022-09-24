import Image from "../../Image";
import PurpleButton from "../../PurpleButton";
import {CMSContext} from "../../cms/CMS";
import {useContext} from "react";


function GetPaintKit(props) {

  const context = useContext(CMSContext);

  return (
    <div className="get-paint-kit">
      <Image 
        image={props.image}
        className="kit-image-container"
      />
      <a href={props.image.type.options} className={`get-kit-link ${context.editingModeOn ? "link-disabled" : ""}`}>
      <PurpleButton 
        buttonText="GET"
      />
      </a>
    </div>
  )
}

export default GetPaintKit;