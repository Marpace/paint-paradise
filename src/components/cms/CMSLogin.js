import { useState } from "react";
import SectionHeader from "../SectionHeader";
 

function CMSLogin(props) {

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  function handleUsernameChange(e) {
    setUsername(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  } 

  function handleSubmit(e) {
    e.preventDefault();
    props.login(username, password)
  }




  return (
    <div className="login">
      <div className={`login__body`}>
          <h1 className="login__body-header">Paint Paradise</h1>
        <form onSubmit={handleSubmit}  className={`login-form`}>
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
        <p className="error-msg">{props.errorMessage}</p>
        <p className="forgot-password">Forgot password</p>
      </div>
    </div>
  )
}

export default CMSLogin;