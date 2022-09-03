import {Link} from "react-router-dom"
import {EditContext} from "../cms/CMS";
import {useContext, useEffect, useState} from "react";

function NavbarDropdownItem(props) {

    const context = useContext(EditContext);
    const [elementState, setElementState] = useState(undefined);
    const [editState, setEditState] = useState(false)

    useEffect(() => {
        setEditState(context.element === elementState ? true : false)
    }, [context])


    function handleClick(e){
        if(!context.editingModeOn) return; 
        context.editContent(e.target.lastChild.innerHTML, e.target.lastChild, props.contentId);
        setElementState(e.target.lastChild)
    }


    return (
        <div onClick={handleClick} className={`drop-down-link`}>
            <div className="drop-down-icon">
                <div className="icon-inner">
                    <div className="icon-front"></div>
                    <div className="icon-back"></div>
                </div>
            </div>
            <Link to={props.url} className={`drop-down-link__anchor ${context.editingModeOn ? "link-disabled" : ""}`}>
                {editState ? context.textValue : props.linkName}
            </Link>
        </div>
    )
}


export default NavbarDropdownItem;
