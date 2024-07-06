import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Cart from "../Pages/Cart/Cart";
import AiRecipe from "../Pages/AI/AiRecipe"
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer"
import Login from "../Components/Login"
import { useState , useEffect } from "react";
import { Toaster } from "react-hot-toast";
import CheckOut from "../Pages/CheckOut/CheckOut";
import { useDispatch, useSelector } from "react-redux";
import {fetchCartData , updateCartInFireStore } from "../Slices/cart"
import {  initializeFromStorage  } from "../Slices/auth"
import Order from "../Pages/Order/Order";
import Reviews from "../Pages/Reviews/Reviews";

function Routing() {
  const dispatch = useDispatch();
  const { cartItem, isInitialized } = useSelector((state) => state.cartReducer);
  const { user  } = useSelector((state) => state.authReducer);
    const [showLogin,setShowLogin] = useState(false);
    const [allAmount, setAllAmount] = useState(0);
    const [cartCount , setCartCount] = useState(0);
  
    // this function simple set currentUser key along with value user object
    function storeLocalStorage (){
      localStorage.setItem("currentUser", JSON.stringify(user));
    }


    // this will set the username and user state in auth slice when user is refresh so that user detail will get from local storage 
     const initializeAuth = () => (dispatch) => {
      dispatch(initializeFromStorage());
    };

    // this will ensure that current user refresh without logout i will remain with log in without re doing the login process
    useEffect(() => {
      dispatch(initializeAuth());
    }, [dispatch]);


    // this for fetching user cart detail if user existing fireStore Database along with promo details 
    useEffect(() => {
      if (user?.uid && !isInitialized) {
        dispatch(fetchCartData(user.uid));
        storeLocalStorage()
      }
    }, [dispatch, user, isInitialized]);
  

     // this for storing every  user cart detail changes iof current user 
    useEffect(() => {
      if (user?.uid && isInitialized) {
        // console.log("update")
        dispatch(updateCartInFireStore({ userId: user.uid, cartItem }));
      }
    }, [dispatch, cartItem, user, isInitialized ]);


  return (
    <>
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false}/>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
        <NavBar setShowLogin={setShowLogin} cartCount={cartCount} setCartCount={setCartCount}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart setShowLogin={setShowLogin} allAmount={allAmount} setAllAmount={setAllAmount} /> }></Route>
          <Route path="/reviews" element={<Reviews setShowLogin={setShowLogin} allAmount={allAmount} setAllAmount={setAllAmount} /> }></Route>
          <Route path="/aiRecipe" element={<AiRecipe />}></Route>
          <Route path="/checkout" element={<CheckOut allAmount={allAmount}/>}></Route>
          <Route path="/order" element={<Order/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default Routing;
