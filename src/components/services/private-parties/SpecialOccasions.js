import SectionHeader from "../../SectionHeader";
import BulletPoint from "../BulletPoint";


function SpecialOccasions() {
  return (
    <div className="private-parties-section">
      <div className="private-parties-section__text">

        <SectionHeader
          tilt="left"
          title="Special Occasions"
        />
        <p className="private-parties-section__text-description">
        Book us for your future private party including 
        bachelorette party, sip and paint with friends, tea 
        party, birthdays, bridal showers and more.
        </p>
        <BulletPoint 
          text="We can come to your home / venue or we can 
          host your party in our studio"
        />
        <BulletPoint 
          text="We are a mobile business and can bring tables 
          and chairs with us when we travel to your location"
        />
        <BulletPoint 
          text="We provide all of the tools including paints, 
          paint brushes, canvasses, aprons, easels, etc"
        />
      </div>
      <div className="private-parties-section__images">
        <img src="/images/services/private_parties/special_occasions_img.png"></img>
      </div>
    </div>
  )
}

export default SpecialOccasions;