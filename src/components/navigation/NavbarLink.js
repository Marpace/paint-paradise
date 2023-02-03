import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {CMSContext} from "../cms/CMS"
import DropdownLink from "./DropdownLink"


function NavbarLink(props) {

    // const path = props.linkName === "Home" ? "" : props.linkName
    



    const context = useContext(CMSContext)
    const location = useLocation().pathname.split("/")[1];
    const [editState, setEditState] = useState(false)
    const [elementState, setElementState] = useState(undefined);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [path, setPath] = useState("")
    // const items = [
    //     {
    //         linkName: props.dropdownLinks[0].content,
    //         contentId: props.dropdownLinks[0]._id,
    //         url: "/Services/private-paint-parties"
    //     },
    //     {
    //         linkName: props.dropdownLinks[1].content,
    //         contentId: props.dropdownLinks[1]._id, 
    //         url: "/Services/paint-night"
    //     },
    //     {
    //         linkName: props.dropdownLinks[2].content,
    //         contentId: props.dropdownLinks[2]._id,
    //         url: "/Services/paint-kits"
    //     }
    //   ]

    let activeLink = location === "" ? "Home" : location

    useEffect(() => {
        setPath( () => {
            switch (props.order) {
                case 1:
                    return ""
                case 2:
                    return "Services"
                case 3:
                    return "About"
                case 4:
                    return "Gallery"
                default:
                    break;
            }
        }) 
    }, [])


      useEffect(() => {
        setEditState(context.element === elementState ? true : false)
      }, [context])

    function editContent(e) {
        if(!context.editingModeOn) return;
        if(e.target.className === "drop-down-link") return;
        if(e.target.className.split(" ")[0] === "nav-link") return;
        const text = e.target.innerHTML;
        context.editContent(text, e.target, props.contentId);
        setElementState(e.target);
        console.log(e.target.className)
    }

    function handleMouseEnter() {
        if(context.editingModeOn) return
        setDropdownOpen(true)
    }
    
    function handleMouseLeave() {
        if(context.editingModeOn) return
        setDropdownOpen(false)
    }

    function toggleDropdown() {
        console.log("toggle")
        setDropdownOpen( dropdownOpen ? false : true)
    }

    if(props.dropdown === "hasDropdown") {
        return (
            <div 
                onClick={editContent}
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                className={`nav-link nav-link-drop-down ${context.editingModeOn ? "editable" : ""}`}>
                <Link 
                    onClick={props.toggleMenu}
                    to={context.editingModeOn ? "#" : path} 
                    className={`link ${activeLink === props.linkName ? "active-nav-link" : ""}`}>
                {editState ? context.textValue : props.linkName}
                </Link>
                
                <img 
                    onClick={toggleDropdown} 
                    className={`drop-down-arrow arrow-white ${dropdownOpen ? "arrow-up" : ""} ${context.editingModeOn ? "link-disabled" : ""}`} 
                    src="./images/navbar/dropdown_icon_white.png">
                </img>
                <img 
                    onClick={toggleDropdown} 
                    className={`drop-down-arrow arrow-purple ${dropdownOpen ? "arrow-up" : ""} ${context.editingModeOn ? "link-disabled" : ""}`} 
                    src="./images/navbar/dropdown_icon.png">
                </img>

                <div className={`drop-down-menu ${dropdownOpen ? "drop-down-open" : ""} ${context.editDropdown ? "cms-dropdown" : ""}`}>
                    {props.dropdownLinks.map( item => (
                    <DropdownLink 
                        key={item._id}
                        linkName={item.content}
                        contentId={item._id}
                        url={item.type.options}
                        toggleMenu={props.toggleMenu}
                    />
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div 
            onClick={editContent} 
            className={`nav-link ${activeLink === props.linkName ? "active-nav-link" : ""} ${context.editingModeOn ? "editable" : ""}`}>
                <Link 
                    onClick={props.toggleMenu}
                    className={`link`} 
                    to={context.editingModeOn ? "#" : path}>
                {editState ? context.textValue : props.linkName}
                </Link>
            </div>
        )
    }
}
    

export default NavbarLink;
