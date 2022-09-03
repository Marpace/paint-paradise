import CMSInterface from "./CMSInterface";
import {useState, useEffect} from "react"
import React from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";



const editObjectContext = {
  editingModeOn: window.location.href.includes("admin") ? true : false,
  editDropdown: false,
  element: ""
}



export const EditContext = React.createContext(editObjectContext)

function CMS() {
  
  const [textValue, setTextValue] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditImageForm, setShowEditImageForm] = useState(false);
  const [editDropdown, setEditDropdown] = useState(false);
  const [contentId, setContentId] = useState();
  const [context, setContext] = useState({
    ...editObjectContext,
    editContent: (text, el, id) => {
      setTextValue(text)
      setShowEditForm(true)
      setShowEditImageForm(false)
      setContentId(id);
      setContext(prev => {
        return {
          ...prev,
          textValue: text,
          element: el
        }
      })
    },
    editImage: (id) => {
      setShowEditForm(false);
      setShowEditImageForm(true);
      setContentId(id)
      setContext(prev => {
        return {
          ...prev,
          selectedImage: id
        }
      })
      console.log(id)
    }
  })

  useEffect(() => {
    setContext(prev => {
      return {
        ...prev,
        editDropdown: editDropdown
      }
    })
  }, [editDropdown])

  function setDropdownEditState() {
    setEditDropdown(editDropdown ? false : true)
  }


  function getTextValue(text) {
    setTextValue(text);
    setContext(prev => {
      return {
        ...prev,
        textValue: text
      }
    })
  }


  return (
    <EditContext.Provider value={context}>
      <main className="cms">
        <CMSInterface 
          textValue={textValue}
          showEditForm={showEditForm}
          showEditImageForm={showEditImageForm}
          contentId={contentId}
          getTextValue={getTextValue}
          setEditDropdown={setDropdownEditState}
          setShowEditForm={setShowEditForm}
          setShowEditImageForm={setShowEditImageForm}
          setTextValue={setTextValue}
          setContext={setContext}
        />
        <div className="editable-area">
            <Navbar 
              editDropdown={editDropdown}
            />
            <Outlet context={textValue}/>
            <Footer />
        </div>
      </main>
    </EditContext.Provider>
  )
}

export default CMS;

