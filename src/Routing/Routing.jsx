import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Cart from "../Pages/Cart/Cart";
import AiRecipe from "../Pages/AI/AiRecipe"
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer"
import Login from "../Components/Login"
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import CheckOut from "../Pages/CheckOut/CheckOut";

function Routing() {
    const [showLogin,setShowLogin] = useState(false);
    const [allAmount, setAllAmount] = useState(0);
  return (
    <>
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false}/>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
        <NavBar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/cart" element={<Cart setShowLogin={setShowLogin} allAmount={allAmount} setAllAmount={setAllAmount}/>}></Route>
          <Route path="/aiRecipe" element={<AiRecipe />}></Route>
          <Route path="/checkout" element={<CheckOut allAmount={allAmount}/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default Routing;
