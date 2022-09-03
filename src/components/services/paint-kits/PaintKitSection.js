import BulletPoint from "../BulletPoint";
import SectionHeader from "../../SectionHeader";
import Paragraph from "../../Paragraph";
import Image from "../../Image";

function PaintKitSection(props) {
  return (
    <div className="paint-kits-section">
      <div className="paint-kits-section__text">
        <SectionHeader
          tilt="left"
          title={props.heading.content}
          contentId={props.heading._id}
        />
        <Paragraph 
          id={props.description._id}
          content={props.description.content}
          className="paint-kits-section__text-description"
        />
        {props.bulletPoints.map((item) => (
          <BulletPoint 
            key={item._id}
            text={item.content}
            contentId={item._id}
          />
        ))}
      </div>
      <Image 
        image={props.image}
        className="paint-kits-section__image"
      />
    </div>
  )
}


export default PaintKitSection;