import FooterContact from "./FooterContact";
import FooterHours from "./FooterHours";
import FooterSocial from "./FooterSocial";
import {UrlContext} from "../App";
import {useContext, useEffect, useState} from "react";

function Footer() {

  const urlContext = useContext(UrlContext);
  const [footerTextContent, setFooterTextContent] = useState([])
  const [titles, setTitles] = useState([])

  useEffect(() => {
    getFooterTextContent();
  }, [])

  function getFooterTextContent() {
    fetch(`${urlContext.baseUrl}/get-global-text-content`)
    .then( res => res.json())
    .then(data => {
      setFooterTextContent(sortContent(data.content, "text", "footer"))
      setTitles(sortContent(data.content, "title", "footer"))
    })
    .catch( err => {
      console.log(err)
    })
  }    

  function sortContent(arr, typeName, section) {
    const content = arr.filter( e => {
      return e.type.name === typeName && e.location.section === section;
    })
    return content;
  }

  if(footerTextContent.length > 0) {
    return (
      <section className="footer">
          <FooterHours 
            title={titles[0]}
            weekendHours={footerTextContent[0]}
            weekdayHours={footerTextContent[1]}
          />
          <FooterContact 
            title={titles[1]}
            phoneNumber={footerTextContent[2]}
            email={footerTextContent[3]}
          />
          <FooterSocial 
          title={titles[2]}
          />
      </section>

    )
  }
}


export default Footer;