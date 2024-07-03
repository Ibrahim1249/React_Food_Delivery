import { useState } from "react"
import Header from "../../Components/Header"
import Menu from "../../Components/Menu"
import FoodDisplay from "../../Components/FoodDisplay"
import { useSelector } from "react-redux"

function Home() {
  const [category , setCategory] = useState("All")
  const {paymentDetails} = useSelector((state)=>{return state.checkOutReducer})
  console.log(paymentDetails)
  return (
    <>
      <Header />
      <Menu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
    </>
  )
}

export default Home