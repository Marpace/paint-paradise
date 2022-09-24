import { useContext, useEffect, useState } from "react";
import {CMSContext} from "./cms/CMS"


function SectionHeader(props) {

    const context = useContext(CMSContext)
    const [editState, setEditState] = useState(false)
    const [elementState, setElementState] = useState(undefined);

    useEffect(() => {
        setEditState(context.element === elementState ? true : false)
    }, [context])

    function editContent(e) {
        if(!context.editingModeOn) return;
        context.editContent(e.target.innerHTML, e.target, props.contentId)
        setElementState(e.target)
    }

    return (
        <div className={`heading-title tilt-${props.tilt}`}>
            <h1 onClick={editContent}  className={`purple-title ${context.editingModeOn ? "editable" : ""}`}>
                {editState ? context.textValue : props.title}
            </h1>
        </div>
    )
}



export default SectionHeader;