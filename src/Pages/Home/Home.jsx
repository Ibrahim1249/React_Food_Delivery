import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../About/About'
import Cart from '../Cart/Cart'
import NavBar from "../../Components/Navbar"
import Login from '../../Components/Login'

function Home() {
  const [showLogin,setShowLogin] = useState(false)
  return (
  
    <>
     {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <NavBar setShowLogin={setShowLogin}/>
      <Routes >
   
       <Route path='/about' element={<About/>}></Route>
       <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </>
  )
}

export default Home