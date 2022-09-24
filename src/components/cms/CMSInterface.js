import { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import Modal from "../Modal"


function CMSInterface(props) {

  // const baseUrl = "http://localhost:8080"
  const baseUrl = "https://paint-paradise.herokuapp.com"
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailMessage, setShowFailMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Content updated successfully!");
  const [failMessage, setFailMessage] = useState("Could no update content!");
  const [filesChosen, setFilesChosen] = useState([]);
  const [previewImgUrl, setPreviewImgUrl] = useState(undefined);
  const [singleFileInputValue, setSingleFileInputValue] = useState("")
  const [multipleFileInputValue, setMultipleFileInputValue] = useState("")
  const [gallery, setGallery] = useState();
  const [chooseImages, setChooseImages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.includes("Gallery") && !props.showEditImageForm && !props.showEditForm) {
      setGallery(true)
    } else {
      setGallery(false)
    }
  }, [location, props.showEditImageForm, props.showEditForm])

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

  function handleSingleFileInputChange(e) {
    if(e.target.value === "") return
    setFilesChosen(e.target.files)
    setPreviewImgUrl(URL.createObjectURL(e.target.files[0]))
    setSingleFileInputValue(e.target.value)
  }

  function handleMultipleFileInputChange(e) {
    if(e.target.value === "") return
    setFilesChosen(e.target.files)
    setMultipleFileInputValue(e.target.value)
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
        console.log("Image updated");
        alert("Image updated");
        window.location.reload();
        props.setShowEditImageForm(false)
        setSingleFileInputValue("")
      }
    })
    .catch( err => console.log(err))

    
  }
  
  //uploads images to the gallery page
  function handleGalleryUpload(e) {
    e.preventDefault();
    const files = e.target.firstChild.files
    const formData = new FormData();
  
    for(let i = 0; i < files.length; i++) {
      formData.append("image", files[i])
    }
    fetch(`${baseUrl}/upload-gallery-images`, {
      method: "POST",
      body: formData
    })
    .then( res => {
      if(res.status === 200) {
        alert("Images uploaded successfully!")
        setMultipleFileInputValue("");
        window.location.reload();
      }
    })
    .catch( err => console.log(err))
  }

  // sets the choosing state so the user can select images to be deleted
  function handleRemoveImages(e) {
    setChooseImages(true);
    props.setContext( prev => {
      return {
        ...prev,
        chooseImages: true
      }
    })
  }

  //permanently deletes the images selected
  function deleteImages() {
    fetch(`${baseUrl}/delete-gallery-images`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({imageIds: props.selectedImages})
    })
    .then((res) => {
      toggleModal();
      res.status === 200 
        ? window.location.reload()
        : alert("Something went wrong!")
    })
    .catch( err => console.log(err))
  }

  function handleCancelImageUpload(e) {
    e.preventDefault();
    setPreviewImgUrl(undefined);
    setFilesChosen([]);
    props.setShowEditImageForm(false);
    setChooseImages(false)
    props.setContext( prev => {
      return {
        ...prev,
        chooseImages: false
      }
    })
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

  function toggleModal() {
    setShowModal(showModal ? false : true)
  }

  return(
    <section className="cms-interface">
      <div className="cms-interface__banner">
        <p className="banner-text">edit mode enabled</p>
      </div>
      <div className="cms-interface__edit">
        <div className="cms-interface__edit-links">
          <Link className="cms-link" to="/admin/">Home</Link>
          <Link className="cms-link" to="/admin/Services">Services</Link>
          <Link className="cms-link" to="/admin/Services/private-paint-parties">Private Parties</Link>
          <Link className="cms-link" to="/admin/Services/paint-night">Paint Night</Link>
          <Link className="cms-link" to="/admin/Services/paint-kits">Paint Kits</Link>
          <Link className="cms-link" to="/admin/About">About</Link>
          <Link className="cms-link" to="/admin/Gallery">Gallery</Link>
          <button onClick={handleDropdownBtnClick} className="cms-link">Dropdown</button>
          <button onClick={props.userLogout} className="logout-btn">Log out</button>
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
            onChange={handleSingleFileInputChange} 
            className="image-upload-form__input" 
            id="image-upload" 
            type="file" 
            value={singleFileInputValue}>
          </input>
          <label className="image-upload-form__label" htmlFor="image-upload">
            <img src="./images/cms/plus_icon.png"></img>Add photo</label>
          <button className={`image-upload-form__btn ${filesChosen.length > 0 ? "show" : "hidden"}`}>Upload</button>
          <button onClick={handleCancelImageUpload} className="image-upload-form__btn">Cancel</button>
          <div className="files-chosen">
            <p>{filesChosen.length > 0 ? filesChosen[0].name : ""}</p>
          </div>
        </form>

        <div className={`gallery-options ${gallery ? "show-flex" : "hidden"}`}>
          <form 
            onSubmit={handleGalleryUpload} 
            className={`gallery-upload-form ${chooseImages ? "hidden" : ""}`}
            encType="multipart/form-data">
            <input 
            onChange={handleMultipleFileInputChange} 
            className="gallery-upload-form__input" 
            id="gallery-image-upload" 
            type="file" 
            value={multipleFileInputValue}
            multiple></input>
            <label className="gallery-upload-form__label" htmlFor="gallery-image-upload"><img src="./images/cms/plus_icon.png"></img>Add photos</label>
            <button className={`gallery-upload-form__btn ${filesChosen.length > 0 ? "show" : "hidden"}`}>Upload</button>
            <div className="files-chosen">
              <p>{filesChosen.length > 0 ? `${filesChosen.length} images selected` : ""}</p>
            </div>
          </form>
          <button 
            onClick={handleRemoveImages} 
            className={`remove-photos-btn ${filesChosen.length > 0 || chooseImages ? "hidden" : "show-flex"}`}>
            <img src="./images/cms/trash_icon.png"></img>
            Remove photos
          </button>
          <div className={`remove-photos ${chooseImages ? "" : "hidden"}`}>
            <p>
              {props.selectedImages.length > 0 
                ? `${props.selectedImages.length} images selected`
                : "Please select the images you want to delete"
              }
            </p>
            <button
              onClick={toggleModal} 
              className={`remove-photos-btn ${props.selectedImages.length === 0 ? "button-disabled" : ""}`}>
              Remove
            </button>
            <Modal 
              text="Are you sure you want to delete the selected images?"
              showModal={showModal}
              toggleModal={toggleModal}
              delete={deleteImages}
            />
          </div>
          <button 
            onClick={handleCancelImageUpload} 
            className={`image-upload-form__btn ${filesChosen.length > 0 || chooseImages ? "show" : "hidden"}`}>
            Cancel
          </button>
        </div>

      </div>
    </section>
  )
}

export default CMSInterface;
