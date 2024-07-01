import { useState } from "react"
import Header from "../../Components/Header"
import Menu from "../../Components/Menu"

function Home() {
  const [category , setCategory] = useState("All")
  return (
    <>
      <Header />
      <Menu category={category} setCategory={setCategory}/>
    </>
  )
}

export default Home