import { useState } from "react"
import Header from "../../Components/Header"
import Menu from "../../Components/Menu"
import FoodDisplay from "../../Components/FoodDisplay"

function Home() {
  const [category , setCategory] = useState("All")
  return (
    <>
      <Header />
      <Menu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
    </>
  )
}

export default Home