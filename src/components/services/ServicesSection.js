import { Link } from "react-router-dom";
import PurpleButton from "../PurpleButton";
import SectionHeader from "../SectionHeader";
import {CMSContext} from "../cms/CMS"
import { useContext} from "react";
import Paragraph from "../Paragraph";
import Image from "../Image"


function ServicesSection(props) {

  const context = useContext(CMSContext);

  return (
    <section className="services__section">
    <div className="services__section-text">
      <SectionHeader 
        tilt={props.tilt}
        title={props.title.content}
        contentId={props.title._id}
      />
      <Paragraph 
        id={props.description._id}
        content={props.description.content}
        className="description"
      />
      <div className="button-container">
        <Link className={`services-learn-more-btn ${context.editingModeOn ? "link-disabled" : ""}`} to={props.path}>
          <PurpleButton 
            buttonText="LEARN MORE"
          />
        </Link>
        <PurpleButton 
          buttonText={props.button.content}
          contentId={props.button._id}
        />
      </div>
    </div>
    <Image 
      image={props.image}
      className="services__section-img"
    />
    </section>
  )
}


export default ServicesSection;