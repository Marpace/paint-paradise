import ContentBlock from "./ContentBlock";
import SectionHeader from "../../SectionHeader";
import {useState, useContext, useEffect} from "react";
import {homeTextContext} from "../Home";



function Content(props) {

  const [headingText, setHeadingText] = useState({});
  const [contentBlocks, setContentBlocks] = useState([]);
  const homeContext = useContext(homeTextContext);

  useEffect(() => {
    if(homeContext.length > 0) {
      const headingContent = homeContext.find(
        e => e.type.name === "heading" && e.location.section === "content"
      )
      setHeadingText(headingContent);
      const titles = sortContent(homeContext, "title", "content")
      const texts = sortContent(homeContext, "text", "content")
      const blockContent = [
        {
          image: props.images[0],
          title: titles[0].content,
          text: texts[0].content,
          titleId: titles[0]._id,
          textId: texts[0]._id
        },
        {
          image: props.images[1],
          title: titles[1].content,
          text: texts[1].content,
          titleId: titles[1]._id,
          textId: texts[1]._id
        },
        {
          image: props.images[2],
          title: titles[2].content,
          text: texts[2].content,
          titleId: titles[2]._id,
          textId: texts[2]._id
        }
      ]
      setContentBlocks(blockContent)
    }
  }, [homeContext]);

  function sortContent(arr, typeName, section) {
    const content = arr.filter( e => {
      return e.type.name === typeName && e.location.section === section;
    })
    return content;
  }

  return (
    <section className="content">
      <SectionHeader
        tilt="right"
        title={headingText.content}
        contentId={headingText._id}
      />
      {contentBlocks.map(block => (
        <ContentBlock 
          key={block.titleId}
          titleContentId={block.titleId}
          textContentId={block.textId}
          image={block.image}
          title={block.title}
          text={block.text}
        />
      ))}
    </section>
  )
}


export default Content