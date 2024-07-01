import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

import { useDispatch , useSelector } from "react-redux";
import {logoutForm} from "../Slices/auth"
import {auth} from "../firebase"

import { useNavigate } from "react-router-dom";




function Navbar({setShowLogin}) {
  const navigate = useNavigate()
  const {userName} = useSelector((state)=>{return state.authReducer})
  const dispatch = useDispatch();
 
  function handleClick(e){
     dispatch(logoutForm({auth}))
    navigate('/')
  }

  return (
    <>
      <nav>
         <div className="logo">
           <img src={logo} alt="" />
            <h4>Foodie</h4>
         </div>
         <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/cart"><li>Cart</li></Link>
         </ul>
         {userName === null ?  <div className="login-button">
            <button onClick={()=>{setShowLogin(true)}}>Login</button>
         </div>: <div className="logout">
           <p>{userName || "Welcome Sir"}</p>
           <button onClick={(e)=>{handleClick(e)}}>Logout</button>
          </div>}
         {/* <div className="login-button">
            <button onClick={()=>{setShowLogin(true)}}>Login</button>
         </div> */}
      </nav>
    </>
  )
}

export default Navbar