
import {food_list} from "../assets/assets"
import FoodItem from "./FoodItem"
function FoodDisplay({category}) {
  return (
    <>
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) =>
          category === "All" || category === item.category ? (
            <FoodItem
              key={index}
              food={item}
            />
          ) : null
        )}
      </div>
    </div>
    </>
  )
}

export default FoodDisplay