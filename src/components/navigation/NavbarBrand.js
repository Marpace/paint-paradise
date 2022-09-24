import {CMSContext} from "../cms/CMS";
import {UrlContext} from "../App";
import {useState, useContext, useEffect} from "react";

function NavbarBrand(props) {

    const urlContext = useContext(UrlContext);
    const context = useContext(CMSContext);
    const [editState, setEditState] = useState(false)
    const [elementState, setElementState] = useState(undefined);
    const [content, setContent] = useState("");
    const [contentId, setContentId] = useState();

    useEffect(() => {
        getNavbarBrandText();
        setEditState(context.element === elementState ? true : false)
    }, [context]);

    function editContent(e) {
        if(!context.editingModeOn) return;
        context.editContent(e.target.innerHTML, e.target, contentId)
        setElementState(e.target)
    }

    function getNavbarBrandText() {
        fetch(`${urlContext.baseUrl}/get-global-text-content`)
        .then(res => res.json(res))
        .then( data => {
            const brandText = data.content.find( 
                item => item.type.name === "heading" && item.location.section === "navbar"
              )
            setContent(brandText.content)
            setContentId(brandText._id)
        })
        .catch( err => {
            console.log(err)
        })
    }

    return (
        <div className="logo">
            <div >
              <img src="./images/navbar/navbar_logo.svg" alt=""></img>
            </div>
            <h3 onClick={editContent} className={`${context.editingModeOn ? "editable" : ""}`}>{editState ? context.textValue : content}</h3>
        </div>
    )
}

export default NavbarBrand;