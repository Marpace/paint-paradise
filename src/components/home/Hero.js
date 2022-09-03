import SectionHeader from "../SectionHeader";
import PurpleButton from "../PurpleButton";
import { useContext, useEffect, useState } from "react";
import {homeTextContext} from "./Home";
import Paragraph from "../Paragraph";

function Hero() {

    const homeContext = useContext(homeTextContext)
    const [headingText, setHeadingText] = useState({});
    const [textText, setTextText] = useState({});
    const [buttonText, setButtonText] = useState({});

    useEffect(() => {
        if(homeContext.length > 1) {
            setHeadingText(sortContent(homeContext, "heading", "hero"))
            setTextText(sortContent(homeContext, "text", "hero"))
            setButtonText(sortContent(homeContext, "button", "hero"))
        }
    }, [homeContext])

    function sortContent(arr, typeName, section) {
        if(!arr) return;
        const content = arr.find( e => e.type.name === typeName && e.location.section === section)
        return content;
    }

    return (
        <section className="hero">
            <div className="hero__1" >
                <SectionHeader 
                    tilt="left"
                    title={headingText.content}
                    contentId={headingText._id}
                />
                <Paragraph 
                    id={textText._id}
                    content={textText.content}
                    className="hero__1-text font-medium"
                />
                <PurpleButton 
                    contentId={buttonText.contentId}
                    buttonText={buttonText.content}
                />
            </div>
            <div className="hero__2">
                <img className="hero__2-img-1" src="./images/home/paint-tube.png" alt="Paint tube"></img>
                <img className="hero__2-img-2" src="./images/home/paintbrush.png" alt="Paint brush"></img>
            </div>
        </section>
    )
}

export default Hero;