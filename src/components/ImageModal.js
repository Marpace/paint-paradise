function ImageModal(props) {

  function handleClick() {
    props.closeModal();
  }

  return (
    <div className={`modal ${props.modalOpen ? "modal-open" : ""}`}>
      <div className="modal-content">
        <div onClick={handleClick} className="modal-close-btn">
          <div className="modal-close-btn-div"></div>
          <div className="modal-close-btn-div"></div>
        </div>
        <img className="modal-img" src={props.imgUrl} alt=""></img>       
      </div>
    </div>
  )
}

export default ImageModal;