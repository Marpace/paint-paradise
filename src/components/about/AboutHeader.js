import Image from "../Image";
import Paragraph from "../Paragraph";
import SectionHeader from "../SectionHeader";

function AboutHeader(props) {


  return (
    <section className="about-header">
      <Image 
        image={props.image}
        className="about-header__img"
      />
      <div className="about-header__text">
        <SectionHeader
          tilt="left"
          title={props.heading.content}
          contentId={props.heading._id}
        />
        <Paragraph 
          id={props.title._id}
          content={props.title.content}
          className="font-medium"
        />
        <Paragraph 
          id={props.texts[0]._id}
          content={props.texts[0].content}
          className=""
        />
        <Paragraph 
          id={props.texts[1]._id}
          content={props.texts[1].content}
          className=""
        />
      </div>
    </section>
  )
}

export default AboutHeader;