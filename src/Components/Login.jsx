import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

function Login({setShowLogin}) {

  const [currState,setCurrState] = useState("Sign Up")
  return (
    <>
     <div className="login">
        <form action="" className="login-container">
          <div className="login-title">
             <h2>{currState}</h2>
             <CloseIcon onClick={()=>{setShowLogin(false)}} style={{width:"16px", cursor:"pointer" }}/>
          </div>
          <div className="login-inputs">
            {currState === "Sign Up" ? <input type="text" placeholder='Your name' required /> : <></>}
             <input type="email" placeholder='Your email' required />
             <input type="password" placeholder='Password' required />
          </div>
          <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
          <div className="login-condition">
             <input type="checkbox" required/>
             <p>By Continuing, i agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "Login" ?<p>Create a new account? <span onClick={()=>{setCurrState("Sign Up")}}>Click here</span></p> 
          :  <p>Already have an account? <span onClick={()=>{setCurrState("Login")}}>Login here</span></p>}
        </form>
     </div>
    </>
  )
}

export default Login