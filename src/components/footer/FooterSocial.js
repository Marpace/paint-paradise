import {CMSContext} from "../cms/CMS";
import {useState, useContext, useEffect} from "react";



function FooterSocial(props) {
  
  const context = useContext(CMSContext);
  const [editState, setEditState] = useState(false);
  const [titleElement, setTitleElement] = useState(undefined);

  useEffect(() => {
    setEditState(context.element === titleElement ? true : false)
  }, [context])

  function editContent(e) {
    if(!context.editingModeOn) return
    context.editContent(e.target.innerHTML, e.target, props.title.id);
    setTitleElement(e.target)
  }
  

  return (
    <div className="footer-section">
      <h1 
      onClick={editContent} 
      className={`footer-title ${context.editingModeOn ? "editable" : ""}`}>
      {editState ? context.textValue : props.title.content}
      </h1>
      <div className="social-icons-container">
        <a className={`${context.editingModeOn ? "link-disabled" : ""}`} href="https://www.facebook.com/PaintParadiseArtStudio">
          <img className="footer-icon" src="./images/footer/facebook_icon.svg" alt="facebook-icon"></img>
        </a>
        <a className={`${context.editingModeOn ? "link-disabled" : ""}`} href="https://www.instagram.com/paintparadise_/?hl=en">
          <img className="footer-icon" src="./images/footer/instagram_icon.svg" alt="instagram-icon"></img>
        </a>
        <a className={`${context.editingModeOn ? "link-disabled" : ""}`} href="https://www.tiktok.com/@paintparadise?lang=en">
          <img className="footer-icon" src="./images/footer/tiktok_icon.svg" alt="tiktok-icon"></img>
        </a>
      </div>
    </div>
  )
}

export default FooterSocial;