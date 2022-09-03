import {EditContext} from "../cms/CMS";
import {useState, useContext, useEffect} from "react";



function FooterHours(props) {

  const context = useContext(EditContext)
  const [editTitleState, setEditTitleState] = useState(false)
  const [editWeekendState, setEditWeekendState] = useState(false)
  const [editWeekdayState, setEditWeekdayState] = useState(false)
  const [titleElement, setTitleElement] = useState(undefined)
  const [weekendHoursElement, setWeekendHoursElement] = useState(undefined)
  const [weekdayHoursElement, setWeekdayHoursElement] = useState(undefined)

  useEffect(() => {
    setEditTitleState(context.element === titleElement ? true : false)
    setEditWeekendState(context.element === weekendHoursElement ? true : false)
    setEditWeekdayState(context.element === weekdayHoursElement ? true : false)
  }, [context])


  function editTitleContent(e) {
    if(!context.editingModeOn) return;
    context.editContent(e.target.innerHTML, e.target, props.title._id)
    setTitleElement(e.target)
  }
  function editWeekendContent(e) {
    if(!context.editingModeOn) return;
    context.editContent(e.target.innerHTML, e.target, props.weekendHours._id)
    setWeekendHoursElement(e.target)
  }
  function editWeekdayContent(e) {
    if(!context.editingModeOn) return;
    context.editContent(e.target.innerHTML, e.target, props.weekdayHours._id)
    setWeekdayHoursElement(e.target)
  }

  return (
    <div className="footer-section footer-hours">
      <img className="footer-logo" src="/images/footer/footer_logo.svg"></img>
      <div className="hours-content">
        <h1 onClick={editTitleContent} className={`footer-title ${context.editingModeOn ? "editable" : ""}`}>{editTitleState ? context.textValue : props.title.content}</h1>
        <p onClick={editWeekendContent} className={`footer-text ${context.editingModeOn ? "editable" : ""}`}>{editWeekendState ? context.textValue : props.weekendHours.content}</p>
        <p onClick={editWeekdayContent} className={`footer-text ${context.editingModeOn ? "editable" : ""}`}>{editWeekdayState ? context.textValue : props.weekdayHours.content}</p>
      </div>
    </div>
  )
}

export default FooterHours;