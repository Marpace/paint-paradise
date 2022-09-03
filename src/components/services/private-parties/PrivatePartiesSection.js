import SectionHeader from "../../SectionHeader";
import BulletPoint from "../BulletPoint";
import {EditContext} from "../../cms/CMS";
import {useContext, useState, useEffect} from "react";
import Paragraph from "../../Paragraph";
import Image from "../../Image";



function PrivatePartiesSection(props) {


  const context = useContext(EditContext);
  const [selectedImg, setSelectedImg] = useState();

  function editImage(e) {
    context.editImage(e.target.id)
    setSelectedImg(e.target.id)
  }


  return (
    <div className="private-parties-section">
      <div className="private-parties-section__text">
        <SectionHeader
          tilt="left"
          title={props.heading.content}
          contentId={props.heading._id}
        />
        <Paragraph 
          id={props.text._id}
          content={props.text.content}
          className="private-parties-section__text-description"
        />
        {props.bulletPoints.map(point => (
          <BulletPoint
            key={point._id}
            text={point.content}
            contentId={point._id}
          />
        ))}
      </div>
      <div className="private-parties-section__images">
          {props.images.map( item => (
            <Image 
              key={item._id}
              image={item}
              className="image-container"
            />
          ))}
      </div>
    </div>
  )
}

export default PrivatePartiesSection;