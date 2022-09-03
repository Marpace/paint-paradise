import {EditContext} from "../cms/CMS";
import {useState, useContext, useEffect} from "react";


function FooterContact(props) {

  const context = useContext(EditContext)

  const [editTitleState, setEditTitleState] = useState(false)
  const [editPhoneState, setEditPhoneState] = useState(false)
  const [editEmailState, setEditEmailState] = useState(false)
  const [titleElement, setTitleElement] = useState(undefined)
  const [phoneElement, setPhoneElement] = useState(undefined)
  const [emailElement, setEmailElement] = useState(undefined)

  useEffect(() => {
    setEditTitleState(context.element === titleElement ? true : false)
    setEditPhoneState(context.element === phoneElement ? true : false)
    setEditEmailState(context.element === emailElement ? true : false)
  }, [context])

  function editTitleContent(e) {
    if(!context.editingModeOn) return;
    context.editContent(e.target.innerHTML, e.target, props.title._id)
    setTitleElement(e.target)
  }
  function editPhoneContent(e) {
    if(!context.editingModeOn) return;
    context.editContent(e.target.children[0].children[1].innerHTML, e.target, props.phoneNumber._id)
    setPhoneElement(e.target)
  }
  function editEmailContent(e) {
    if(!context.editingModeOn) return;
    context.editContent(e.target.children[0].children[1].innerHTML, e.target, props.email._id)
    setEmailElement(e.target)
  }


  return (
    <div className="footer-section">
      <h1 
      onClick={editTitleContent}
      className={`footer-title ${context.editingModeOn ? "editable" : ""}`}>
      {editTitleState ? context.textValue : props.title.content}
      </h1>
      <div onClick={editPhoneContent} className={`contact-item ${context.editingModeOn ? "editable" : ""}`}>
        <a className={`contact-link ${context.editingModeOn ? "link-disabled" : ""}`} href="Tel:6473909659">
          <img className="footer-icon" src="/images/footer/phone_icon.svg" alt="phone-icon"></img>
          <p className="footer-text">
          {editPhoneState ? context.textValue : props.phoneNumber.content}</p>
        </a>
      </div>
      <div onClick={editEmailContent} className={`contact-item ${context.editingModeOn ? "editable" : ""}`}>
        <a className={`contact-link ${context.editingModeOn ? "link-disabled" : ""}`} href="mailto:Paint.Paradise.Art@gmail.com">
          <img className="footer-icon" src="/images/footer/email_icon.svg" alt="email-icon"></img>
          <p className={`footer-text`}>
          {editEmailState ? context.textValue : props.email.content}
          </p>
        </a>
      </div>
    </div>
  )
}

export default FooterContact;