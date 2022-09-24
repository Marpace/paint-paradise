import React from "react";
import CMSInterface from "./CMSInterface";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import CMSLogin from "./CMSLogin"
import { Outlet, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"




const contextObject = {
  editingModeOn: window.location.href.includes("/#/admin") ? true : false,
  editDropdown: false,
  element: "",
  auth: {
    token: null,
    loggedIn: false
  },
  // baseUrl: "http://localhost:8080"
  baseUrl: "https://paint-paradise.herokuapp.com"
}

export const CMSContext = React.createContext(contextObject)

function CMS() {

  
  //auth
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [textValue, setTextValue] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditImageForm, setShowEditImageForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [editDropdown, setEditDropdown] = useState(false);
  const [contentId, setContentId] = useState();
  const [context, setContext] = useState({
    ...contextObject,
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
    },
    pushId: (id) => {
      setSelectedImages( prev => {
        if(prev.includes(id)){
          return prev.filter(item => item !== id)
        } else {
          return [...prev, id]
        }
      })

    }
  })

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token) return;
    if (new Date(expiryDate) <= new Date()) {
      userLogout();
      return;
    }
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setContext( prev => {
      return {
        ...prev, 
        auth: {
          token: token,
          loggedIn: true
        }
      }
    })
    setLoggedIn(true);
    autoLogout(remainingMilliseconds);
  }, [])

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

  function login(username, password) {
    fetch(`${contextObject.baseUrl}/login`,{
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      setContext( prev => {
        return {
          ...prev,
          auth: {
            token: data.token,
            loggedIn: true
          }
        }
      })
      setLoggedIn(true);
      autoLogout(remainingMilliseconds);
      navigate("/admin/")
    })
    .catch( err => {
      console.log(err);
      setErrorMessage("Could not login, please check username and password and try again")
    })
  }

  function userLogout() { 
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    window.location.reload();
  }

  function autoLogout(milliseconds) {
    setTimeout(() => {
      userLogout();
    }, milliseconds);
  };

  if(loggedIn) {
    return (
      <CMSContext.Provider value={context}>
        <main className="cms">
          <CMSInterface 
            textValue={textValue}
            showEditForm={showEditForm}
            showEditImageForm={showEditImageForm}
            contentId={contentId}
            selectedImages={selectedImages}
            getTextValue={getTextValue}
            setEditDropdown={setDropdownEditState}
            setShowEditForm={setShowEditForm}
            setShowEditImageForm={setShowEditImageForm}
            setTextValue={setTextValue}
            setContext={setContext}
            userLogout={userLogout}
          />
          <div className="editable-area">
              <Navbar 
                editDropdown={editDropdown}
              />
              <Outlet context={textValue}/>
              <Footer />
          </div>
        </main>
      </CMSContext.Provider>
    )
  } else {
    return (
      <CMSLogin 
        login={login}
        errorMessage={errorMessage}
      />
    )
  }
  
}

export default CMS;

