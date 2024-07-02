import { assets } from "../assets/assets";
import { handleAddCart , handleRemoveCart } from "../Slices/cart";
import { useDispatch, useSelector } from "react-redux";

function FoodItem({ food }) {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => {
    return state.cartReducer;
  });


  return (
    <>
      <div className="food-item">
        <div className="food-item-img-container">
          <img className="food-item-image" src={food.image} alt="" />
          {!cartItem[food._id] ? (
            <img
              className="add"
              onClick={()=> dispatch(handleAddCart(food._id))}
              src={assets.add_icon_white}
            />
          ) : (
            <div className="food-item-counter">
              <img
                className="add2"
                onClick={()=> dispatch(handleRemoveCart(food._id))}
                src={assets.remove_icon_red}
              />
              <p>{cartItem[food._id]}</p>
              <img
                className="add2"
                onClick={()=> dispatch(handleAddCart(food._id))}
                src={assets.add_icon_green}
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{food.name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-desc">{food.description}</p>
          <p className="food-item-price">${food.price}</p>
        </div>
      </div>
    </>
  );
}

export default FoodItem;
