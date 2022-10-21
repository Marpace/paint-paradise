import { useState, useContext } from "react";
import {CMSContext} from "./CMS"
import {Link} from "react-router-dom";
 

function CMSLogin(props) {

  const context = useContext(CMSContext);

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  const [codeInput, setCodeInput] = useState(""); 
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false)

  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);

  function handleUsernameChange(e) {
    setUsername(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    props.login(username, password)
  }

  function handleForgotPasswordClick() {
    setForgotPassword(prev => {
      return prev ? false : true;
    })
    fetch(`${context.baseUrl}/send-verification-code`)
    .then( res => res.json())
    .catch(err => console.log(err))
  }

  function handleCodeChange(e) {
    setCodeInput(e.target.value)
  } 

  function handleVerifyCode(e) {
    e.preventDefault();
    fetch(`${context.baseUrl}/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({code: codeInput})
    })
    .then(res => {
      res.json();
      console.log(res.status)
      if(res.status !== 200) {
        setResetPasswordMessage("Invalid code!");
      } else {
        setResetPasswordMessage("")
        setCodeVerified(true)
        setForgotPassword(false)
        console.log("Code verified!")
      }
    })
    .catch(err => console.log(err))
  }

  function handleNewPasswordChange(e) {
    setNewPasswordInput(e.target.value)
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPasswordInput(e.target.value)
  }

  function handleResetPassword(e) {
    e.preventDefault(); 
    fetch(`${context.baseUrl}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      }, 
      body: JSON.stringify({
        newPassword: newPasswordInput, 
        confirmedPassword: confirmPasswordInput
      })
    })
    .then(res => {
      res.json()
      if(res.status === 400) {
        setResetPasswordMessage("Passwords do not match!")
      } else {
        setPasswordReset(true)
        setResetPasswordMessage("Your password has been changed")
      }
    })
    .catch(err => console.log(err))
  }

  function refreshPage() {
    window.location.reload();
  }


  return (
    <div className="login">
      <div className={`login__body`}>
          <h1 className="login__body-header">Paint Paradise</h1>

        <form onSubmit={handleLoginSubmit}  className={`login-form ${forgotPassword || codeVerified ? "hidden" : "show-flex"}`}>
          <input 
            className="login-form__input" 
            onChange={handleUsernameChange} 
            type="text" 
            placeholder="Username" 
            value={username} 
            required>
          </input>
          <input 
            className="login-form__input" 
            onChange={handlePasswordChange} 
            type="password" 
            placeholder="Password" 
            value={password} 
            required>
          </input>
          <button className="login-form__button">Login</button>
        </form>

        <form onSubmit={handleVerifyCode} className={`login-form ${forgotPassword ? "show-flex" : "hidden"}`}>
          <p>A verification code has been sent to example@gmail.com</p>
          <input 
            className="login-form__input reset-code-input" 
            onChange={handleCodeChange} 
            type="number" 
            placeholder="Verification code" 
            value={codeInput} 
            required>
          </input>
          <button className="login-form__button">Submit</button>
        </form>

        <form onSubmit={handleResetPassword}  className={`login-form ${codeVerified ? "show-flex" : "hidden"}`}>
          <input 
            className="login-form__input" 
            onChange={handleNewPasswordChange} 
            type="password" 
            placeholder="New password" 
            value={newPasswordInput} 
            required>
          </input>
          <input 
            className="login-form__input" 
            onChange={handleConfirmPasswordChange} 
            type="password" 
            placeholder="Confirm password" 
            value={confirmPasswordInput} 
            required>
          </input>
          <button className="login-form__button">Submit</button>
        </form>

        <p className={`error-msg ${passwordReset ? "success-msg" : ""}`}>{forgotPassword || codeVerified ? resetPasswordMessage : props.errorMessage}</p>
        <p onClick={refreshPage} className={`forgot-password ${passwordReset ? "show" : "hidden"}`}>Login</p>
        <p onClick={handleForgotPasswordClick} className={`forgot-password ${passwordReset ? "hidden" : "show"}`}>
          {forgotPassword ? "Back" : "Forgot password"}
        </p>
      </div>
    </div>
  )
}

export default CMSLogin;