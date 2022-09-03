import SectionHeader from "../../SectionHeader";
import BulletPoint from "../BulletPoint";

function KidsParties() {
  return (
    <div className="private-parties-section">
      <div className="private-parties-section__text">
        <SectionHeader
          tilt="left"
          title="Kids Parties"
        />
        <p className="private-parties-section__text-description">
        We provide children's paint parties where kids can 
        express their creativity. Including birthdays or social 
        events, march break activities, workshops, and more.
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
        <BulletPoint 
          text="The duration is a total of 3 hours, which 
          includes 1 hour for setup and cleanup and 2 hours of 
          painting"
        />
        <BulletPoint 
          text="Our fees are per person, for children's party 
          rates please call or e-mail us and we provide you with 
          our promotional rate of the day"
        />
      </div>
      <div className="private-parties-section__images">
        <img src="/images/services/private_parties/kids_parties_img_1.png"></img>
        <img src="/images/services/private_parties/kids_parties_img_2.png"></img>
      </div>
    </div>
  )
}

export default KidsParties;