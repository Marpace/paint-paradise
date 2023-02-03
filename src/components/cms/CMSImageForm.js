function CMSImageForm() {

  function handleSubmitImage() {

  }

  function handleSingleFileInputChange() {

  }

  function handleCancelImageUpload() {
    
  }

  return (
    <form 
      onSubmit={handleSubmitImage} 
      className={`cms-interface__edit-form image-upload-form ${props.showEditImageForm ? "show-flex" : "hidden"}`}
      encType="multipart/form-data">
      <input 
        onChange={handleSingleFileInputChange} 
        className="image-upload-form__input" 
        id="image-upload" 
        type="file">
      </input>
      <label className="image-upload-form__label" htmlFor="image-upload">
        <img src="./images/cms/plus_icon.png"></img>Add photo</label>
      <button className={`image-upload-form__btn ${filesChosen.length > 0 ? "show" : "hidden"}`}>Upload</button>
      <button onClick={handleCancelImageUpload} className="image-upload-form__btn">Cancel</button>
      <div className="files-chosen">
        <p>{filesChosen.length > 0 ? filesChosen[0].name : ""}</p>
      </div>
    </form>
  )
}


export default CMSImageForm;