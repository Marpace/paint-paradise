import ContentBlock from "./ContentBlock";
import SectionHeader from "../../SectionHeader";
import {useState, useContext, useEffect} from "react";
import {homeTextContext} from "../Home";



function Content() {

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
          imageSrc: "",
          title: titles[0].content,
          text: texts[0].content,
          titleId: titles[0]._id,
          textId: texts[0]._id
        },
        {
          imageSrc: "",
          title: titles[1].content,
          text: texts[1].content,
          titleId: titles[1]._id,
          textId: texts[1]._id
        },
        {
          imageSrc: "",
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
          imageSrc={block.imageSrc}
          title={block.title}
          text={block.text}
        />
      ))}
    </section>
  )
}


export default Content