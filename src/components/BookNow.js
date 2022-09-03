import PurpleButton from "./PurpleButton";
import SectionHeader from "./SectionHeader";


function BookNow(props) {


    return (
      <section className="book-now">
      <SectionHeader
        tilt="left"
        title={props.title.content}
        contentId={props.title._id}
      />
      <PurpleButton 
        buttonText={props.button.content}
        contentId={props.button._id}
      />
    </section>  
    )
}

export default BookNow