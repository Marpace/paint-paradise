function Modal(props) {

  return (
    <div className={`cms-modal ${!props.showModal ? "hidden" : ""}`}>
      <div className="cms-modal__body">
        <p className="cms-modal__body-text">{props.text}</p>
        <div className="cms-modal__body-buttons">
          <button onClick={props.delete} className="cms-modal__btn">Delete</button>
          <button onClick={props.toggleModal} className="cms-modal__btn">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;