import CarouselControls from "../../CarouselControls";
import SectionHeader from "../../SectionHeader";
import TestimonialsCard from "./TestimonialsCard";
import {CMSContext} from "../../cms/CMS"
import { homeTextContext } from "../Home";
// import { UrlContext } from "../../App";
import {useState, useContext, useEffect} from "react";

function TestimonialsCarousel() {

  const [cardPositions, setCardPositions] = useState(["left", "middle", "right"]);
  const [headingText, setHeadingText] = useState({});
  const [texts, setTexts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const context = useContext(CMSContext)
  // const urlContext = useContext(UrlContext)
  const homeContext = useContext(homeTextContext);

  useEffect(() => {
    // getTestimonialsCarouselContent();
    const headingContent = homeContext.find(
      e => e.type.name === "heading" && e.location.section === "testimonials"
      )
    setHeadingText(headingContent);
    setTexts(sortContent(homeContext, "text", "testimonials"));
    setAuthors(sortContent(homeContext, "author", "testimonials"));
  }, [homeContext])

  function sortContent(arr, typeName, section) {
    const content = arr.filter( e => {
      return e.type.name === typeName && e.location.section === section;
    })
    return content.sort((a, b) => a.order - b.order);
  }

  function rotateCardsLeft() {
    let arr = [...cardPositions]
    arr.unshift(arr.pop());
    setCardPositions(arr)
  }
  function rotateCardsRight() {
    let arr = [...cardPositions]
    arr.push(arr.shift());
    setCardPositions(arr)
  }


  if(authors.length > 0) {
    return (
      <section className="testimonials">
        <SectionHeader
          tilt="right"
          title={headingText.content}
          contentId={headingText._id}
        />
        <div className={`testimonial-cards ${context.editingModeOn ? "testimonial-editable" : ""}`}>
          <TestimonialsCard 
            text={texts[0].content}
            textId={texts[0]._id}
            author={authors[0].content}
            authorId={authors[0]._id}
            position={cardPositions[1]}
          />
          <TestimonialsCard 
            text={texts[1].content}
            textId={texts[1]._id}
            author={authors[1].content}
            authorId={authors[1]._id}
            position={cardPositions[2]}
          />
          <TestimonialsCard 
            text={texts[2].content}
            textId={texts[2]._id}
            author={authors[2].content}
            authorId={authors[2]._id}
            position={cardPositions[0]}
          />
          
        </div>
        <CarouselControls 
          rotateCardsLeft={rotateCardsLeft}
          rotateCardsRight={rotateCardsRight}
          infinite={true}
        />
      </section>
      )
  }
}


export default TestimonialsCarousel;