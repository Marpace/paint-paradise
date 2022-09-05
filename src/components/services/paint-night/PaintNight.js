import PurpleButton from "../../PurpleButton";
import SectionHeader from "../../SectionHeader";
import SitePath from "../SitePath";
import { UrlContext } from "../../App";
import {useContext, useEffect, useState} from "react";
import {EditContext} from "../../cms/CMS";
import Paragraph from "../../Paragraph";
import LoadingScreen from "../../LoadingScreen";



function PaintNight() {

  const urlContext = useContext(UrlContext);
  const context = useContext(EditContext);


  const [heading, setHeading] = useState({});
  const [text, setText] = useState({});
  const [button, setButton] = useState({});
  const [image, setImage] = useState({});
  const [selectedImg, setSelectedImg] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false)

  useEffect(() => {
    getContent();
  }, [])


  function getContent() {
    fetch(`${urlContext.baseUrl}/get-paint-night-text-content`)
    .then( res => res.json())
    .then( data => {
      setHeading(sortContent(data.content, "heading"));
      setText(sortContent(data.content, "text"));
      setButton(sortContent(data.content, "button"));
      //return image fetch 
      return fetch(`${urlContext.baseUrl}/get-paint-night-image-content`)
    })
    .then( res => res.json())
    .then( data => {
      setImage(data.content[0])
      setContentLoaded(true);
    })
    .catch( err => console.log(err))
  }

  function sortContent(arr, typeName){
    const obj = arr.find(e => e.type.name === typeName)
    return obj;
  }

  function editImage(e){
    context.editImage(e.target.id)
    setSelectedImg(e.target.id)
  }


  if(contentLoaded) {
    return (
      <div className="paint-night">
        <SitePath/>
        <div className="paint-night__section">
          <div className="paint-night__section-text">
            <SectionHeader
              tilt="left"
              title={heading.content}
              contentId={heading._id}
            />
            <Paragraph 
              id={text._id}
              content={text.content}
              className="paint-night__section-text-description"
            />
            <PurpleButton 
              buttonText={button.content}
              contentId={button._id}
            />
          </div>
          <div className="paint-night__section-image">
            <img 
              className="paint-night-img"
              src={selectedImg === image._id
                    ? context.previewImgUrl === undefined ? image.path : context.previewImgUrl 
                    : image.path } 
              alt="People at restaurant paint party">
            </img>
            <div id={image._id} onClick={editImage} className="edit-icon">
              <img id={image._id} className="edit-icon__icon" src="/images/cms/edit_icon.png"></img>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
}

export default PaintNight;