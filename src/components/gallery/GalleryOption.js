import GalleryOptionImage from "./GalleryOptionImage";
import SectionHeader from "../SectionHeader";
import {CMSContext} from "../cms/CMS"
import {useContext} from "react";

function GalleryOption(props) {

  const context = useContext(CMSContext);

  function setGridImages() {
    props.setGridImages(props.gridImages)
    props.scrollToGrid();
  }

  function handleOptionClick() {
    context.setGallerySection(props.sectionTitle);
  }

  return (
    <div onClick={handleOptionClick} className="gallery__option">
        <SectionHeader 
          title={props.sectionTitle}
          tilt={"left"}
          contentId={1234}
        />
      <div onClick={setGridImages} className="gallery__option-images">
        {props.images.map(image => (
          <GalleryOptionImage 
            key={image._id}
            path={image.path}
          />
        ))}
    </div>
  </div>
  )
}



export default GalleryOption;