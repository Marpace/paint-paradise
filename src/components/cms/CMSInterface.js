import { useEffect, useState } from "react";
import {Link} from "react-router-dom";


function CMSInterface(props) {


  const baseUrl = "http://localhost:8080"
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailMessage, setShowFailMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Content updated successfully!");
  const [failMessage, setFailMessage] = useState("Could no update content!");
  const [filesChosen, setFilesChosen] = useState([]);
  const [previewImgUrl, setPreviewImgUrl] = useState(undefined);
  const [fileInputValue, setFileInputValue] = useState("")


  useEffect(() => {
    props.setContext( prev => {
      return {
        ...prev,
        previewImgUrl: previewImgUrl
      }
    })
    return () => URL.revokeObjectURL(previewImgUrl);
  }, [previewImgUrl])
  
  function handleChange(e) {
    props.getTextValue(e.target.value);
  }

  function handleDropdownBtnClick() {
    props.setEditDropdown();
  }

  function handleFileInputChange(e) {
    if(e.target.value === "") return
    setFilesChosen(e.target.files)
    setPreviewImgUrl(URL.createObjectURL(e.target.files[0]))
    setFileInputValue(e.target.value)
    console.log(e.target.value)
  }
  
  function handleSubmitImage(e) {
    e.preventDefault()  
    const currentLocation = window.location.href.split("/").at(-1).toLowerCase();
    const page = currentLocation === "admin" ? "home" : currentLocation
    console.log(e.target.firstChild.files[0])
    const formData = new FormData();
    formData.append("image", e.target.firstChild.files[0])
    formData.append("contentId", props.contentId)
    fetch(`${baseUrl}/upload-${page}-image`, {
      method: "POST",
      body: formData
    })
    .then( res => {
      if(res.status === 200) {
        console.log("Image updated")
        alert("Image updated")
        props.setShowEditImageForm(false)
        setFileInputValue("")
      }
    })
    .catch( err => console.log(err))
  }
  


  function handleCancelImageUpload(e) {
    e.preventDefault()
    setPreviewImgUrl(undefined);
    setFilesChosen([]);
    props.setShowEditImageForm(false)
  }

  function handleSaveClick(e){
    e.preventDefault();
    fetch(`${baseUrl}/update-text-content`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({contentId: props.contentId, content: props.textValue})
    })
    .then( res => {
      if(res.status === 200) {
        console.log("Content updated successfully")
        setShowSuccessMessage(true)
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 2000)
      }
      if(res.status === 404) {
        console.log("Could not update Content")
        setShowFailMessage(true)
        setTimeout(() => {
          setShowFailMessage(false)
        }, 2000)
      }
    })
    .catch( err => {
      console.log(err);
    })
  }

  function handleCancelClick(e) {
    e.preventDefault();
    props.setShowEditForm(false);
    props.setTextValue("")
    props.setContext(prev => {
      return {
        ...prev,
        element: null
      }
    })
  }

  return(
    <section className="cms-interface">
      <div className="cms-interface__banner">
        <p className="banner-text">edit mode enabled</p>
      </div>
      <div className="cms-interface__edit">
        <div className="cms-interface__edit-links">
          <Link className="cms-link" to="/admin">Home</Link>
          <Link className="cms-link" to="/admin/Services">Services</Link>
          <Link className="cms-link" to="/admin/Services/private-paint-parties">Private Parties</Link>
          <Link className="cms-link" to="/admin/Services/paint-night">Paint Night</Link>
          <Link className="cms-link" to="/admin/Services/paint-kits">Paint Kits</Link>
          <Link className="cms-link" to="/admin/About">About</Link>
          <Link className="cms-link" to="/admin/Gallery">Gallery</Link>
          <button onClick={handleDropdownBtnClick} className="cms-link">Dropdown</button>
        </div>
        <form className={`cms-interface__edit-form ${props.showEditForm ? "show-flex" : "hidden"}`}>
          <textarea onChange={handleChange} className="form-input" rows={2} value={props.textValue}></textarea>
          <div className="form-buttons">
            <button onClick={handleSaveClick} className="cms-form-btn">SAVE CHANGES</button>
            <button onClick={handleCancelClick} className="cms-form-btn">CANCEL</button>
            <p className={`success-message ${showSuccessMessage ? "show" : ""}`}>{successMessage}</p>
            <p className={`fail-message ${showFailMessage ? "show" : ""}`}>{failMessage}</p>
          </div>
        </form>
        <form 
          onSubmit={handleSubmitImage} 
          className={`cms-interface__edit-form image-upload-form ${props.showEditImageForm ? "show-flex" : "hidden"}`}
          encType="multipart/form-data">

          <input 
          onChange={handleFileInputChange} 
          className="image-upload-form__input" 
          id="image-upload" 
          type="file" 
          value={fileInputValue}></input>
          <label className="image-upload-form__label" htmlFor="image-upload"><img src="/images/cms/plus_icon.png"></img>Add photo</label>
          <button className={`image-upload-form__btn ${filesChosen.length > 0 ? "show" : "hidden"}`}>Upload</button>
          <button onClick={handleCancelImageUpload} className="image-upload-form__btn">Cancel</button>
          <div className="files-chosen">
            <p>{filesChosen.length > 0 ? filesChosen[0].name : ""}</p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CMSInterface;

