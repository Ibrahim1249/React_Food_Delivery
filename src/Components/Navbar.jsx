import { Link } from "react-router-dom"





function Navbar({setShowLogin}) {
  return (
    <>
      <nav>
         <img src="" alt="" />
         <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/cart"><li>Cart</li></Link>
         </ul>
         <div className="login-button">
            <button onClick={()=>{setShowLogin(true)}}>Login</button>
         </div>
      </nav>
    </>
  )
}

export default Navbar