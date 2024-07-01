import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Cart from "../Pages/Cart/Cart";
import AiRecipe from "../Pages/AI/AiRecipe"
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer"
import Login from "../Components/Login"
import { useState } from "react";

function Routing() {
    const [showLogin,setShowLogin] = useState(false)
  return (
    <>
      <BrowserRouter>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
        <NavBar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/aiRecipe" element={<AiRecipe />}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default Routing;
