import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutForm } from "../Slices/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import Search from "./Search";
import { useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import GrainIcon from '@mui/icons-material/Grain';
import Hamburger from "./Hamburger";









function Navbar({ setShowLogin , cartCount , setCartCount}) {

  const navigate = useNavigate();
  const { user, userName, error  } = useSelector((state) => state.authReducer);
  const {cartItem} = useSelector((state)=>{return state.cartReducer})
  const {paymentDetails} = useSelector((state)=>{return state.checkOutReducer});
  const dispatch = useDispatch();


  // this will clear currentUser from localStorage 
  function clearLocalStorage(){
      if(localStorage.getItem("currentUser")){
        localStorage.removeItem("currentUser");
      }
      if(localStorage.getItem("userReviews")){
        localStorage.removeItem("userReviews")
      }
  }

  // this will work when user logout along with dispatch i also clear from local storage of current user 
  function handleLogout() {
    dispatch(logoutForm({ auth }));
     clearLocalStorage()
    navigate("/");
  }

  if (error) {
    toast.error(error);
    return;
  }

  // this will show cart count to UI from Navbar 
  useEffect(()=>{
      setCartCount(Object.keys(cartItem).length)
  },[cartItem])

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={assets.logo} alt="" />
          <h4>Foodie</h4>
        </div>

        <ul className="navbar-menu">
          <Link to="/">
            <li>Home</li>
          </Link>
           <a href="#food-display">
            <li>Menu</li>
           </a>
           <Link to='/reviews'><li>Reviews</li></Link>
          <Link to="/aiRecipe">
            <li>Ai Recipe</li>
          </Link>
          <Link to="/cart"><li>Cart <span className="cart-count">{cartCount > 0 ? cartCount : ""}</span></li></Link>
          <Link to='/order'><li>{paymentDetails.length > 0 ? "Order History" : ""}</li></Link>
        </ul>

        <ul className="icons">
        <Link to="/">
            <li><HomeIcon/></li>
          </Link>
           <a href="#food-display">
            <li><RestaurantMenuIcon/></li>
           </a>
           <Link to='/reviews'><li><ReviewsIcon/></li></Link>
          <Link to="/aiRecipe">
            <li><GrainIcon/></li>
          </Link>
          <Link to="/cart"><li> <AddShoppingCartIcon/> <span className="cart-count">{cartCount > 0 ? cartCount : ""}</span></li></Link>
          <Link to='/order'><li>{paymentDetails.length > 0 ? <PaymentIcon/> : ""}</li></Link>
        </ul>
 
        <div className="navbar-right">
          <Search />

          <div className="hamburger">
            <Hamburger />
          </div>

          {userName === undefined ? (
            <div className="login-button">
              <button
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Login
              </button>
            </div>
          ) : (
            <div className="logout">
              <p>{userName || user?.email || "Welcome"}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}



export default Navbar;
