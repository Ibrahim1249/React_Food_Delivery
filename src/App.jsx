

import "./App.css"
import { BrowserRouter } from "react-router-dom"
import Home from "./Pages/Home/Home"
function App() {
  return (
     <>
          <BrowserRouter>
            <Home/>
          </BrowserRouter>
     </>
  )
}

export default App