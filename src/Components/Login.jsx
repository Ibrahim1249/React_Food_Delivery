import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from '@mui/icons-material/Google';

import { handleSignUp , handleLogin, handleResetForm } from "../Slices/auth";
import { useDispatch , useSelector } from "react-redux";
import { signUpForm , loginForm } from "../Slices/auth"
import {auth } from "../firebase"

function Login({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign Up");

  const dispatch = useDispatch();
  const {signUp , login , error ,userName } = useSelector((state)=>{return state.authReducer})
 
  
  function handleChange(e){
    const {name , value} = e.target;
    currState === "Sign Up" ? dispatch(handleSignUp({field:name , value})) : dispatch(handleLogin({field:name , value}))
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    currState === "Sign Up" ?   
     dispatch(signUpForm({ 
      auth, 
      email: signUp.email, 
      password: signUp.password,
      name:signUp.name
    })) 
 
    : dispatch(loginForm({ 
      auth, 
      email: login.email, 
      password: login.password,
    }));
  
    dispatch(handleResetForm(currState)) 
    setShowLogin(false)

  };

  // const handleGoogleClick =(e)=>{
  //    dispatch(SignInWithGoogle({auth}))
  //    setShowLogin(false)
  // }

  return (
    <>
      <div className="login">
        <form action="" method="post" className="login-container" onSubmit={handleSubmit}>
          <div className="login-title">
            <h2>{currState}</h2>
            <CloseIcon
              onClick={() => {
                setShowLogin(false);
              }}
              style={{ width: "16px", cursor: "pointer" }}
            />
          </div>
          <div className="login-inputs">
            {currState === "Sign Up" ? (
              <input type="text" placeholder="Your name" required name="name"  value={signUp.name} onChange={(e)=>{handleChange(e)}}/>
            ) : (
              <></>
            )}
            <input type="email" placeholder="Your email" required name="email" value={currState === "Sign Up" ? signUp.email : login.email} onChange={(e)=>{handleChange(e)}}/>
            <input type="password" placeholder="Password" required name="password" value={currState === "Sign Up" ? signUp.password : login.password} onChange={(e)=>{handleChange(e)}}/>
          </div>
          <button type="submit"> 
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>
          <div className="login-condition">
            <input type="checkbox" required />
            <p>By Continuing, i agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => {
                  setCurrState("Sign Up");
                }}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                }}
              >
                Login here
              </span>
            </p>
          )}


            
             <button onClick={(e)=>{handleGoogleClick(e)}}> <GoogleIcon style={{fontSize:"18px"}}/>Sign in with google</button>
        </form>
      </div>
    </>
  );
}

export default Login;
