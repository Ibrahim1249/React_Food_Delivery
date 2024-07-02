import { Link } from "react-router-dom"


import { useDispatch , useSelector } from "react-redux";
import {logoutForm} from "../Slices/auth"
import {auth} from "../firebase"

import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets"
import toast from "react-hot-toast";



function Navbar({setShowLogin}) {
  const navigate = useNavigate()
  const {user ,  userName , error} = useSelector((state)=>state.authReducer)

  const dispatch = useDispatch();
 
  function handleLogout(){
     dispatch(logoutForm({auth}))
    navigate('/')
  }

  if (error) {
   toast.error(error)
   return;
 }



  return (
   
    <>

      <div className="navbar">
         <div className="logo">
             <img src={assets.logo} alt="" />
             <h4>Foodie</h4>
         </div>
         <ul className="navbar-menu">
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/cart"><li>Cart</li></Link>
            <Link to="/aiRecipe"><li>Ai Recipe</li></Link>
         </ul>
         <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
               <img src={assets.basket_icon} alt="" />
               <div className="dot"></div>
            </div>
           
           {userName === undefined ?
               <div className="login-button"> 
                 <button onClick={()=>{setShowLogin(true)}}>Login</button>
              </div>
             :
               <div className="logout">
                <p>{userName || user?.email || "Welcome"}</p>
                <button onClick={handleLogout}>Logout</button>
               </div>
             }
         </div>
      </div>
    </>
  )
}

export default Navbar

