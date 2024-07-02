import {
  handleAddCart,
  handleRemoveCart,
  handleRemoveItemFromCart,
} from "../../Slices/cart";
import { useDispatch, useSelector } from "react-redux";
import { food_list } from "../../assets/assets";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartImg from "../../assets/cartImg.avif"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Cart({setShowLogin}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItem } = useSelector((state) => {
    return state.cartReducer;
  });
  const [allAmount, setAllAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const {userName} = useSelector((state)=>{return state.authReducer})
  function calculateTotalAmount() {
    let total = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        total += itemInfo.price * cartItem[item];
      }
    }
    setAllAmount(total);
  }
  useEffect(() => {
    calculateTotalAmount();
  }, [cartItem]);

  

  return (
    <>
      {allAmount > 0 ? (
        <div className="cart">
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) =>
              cartItem[item._id] ? (
                <>
                  <div key={index} className="cart-items-title cart-items-item">
                    <img src={item.image} />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <div className="expand-box">
                      <ExpandLessIcon onClick={()=>{dispatch(handleAddCart(item._id))}} style={{cursor:"pointer"}}/>
                      <p>{cartItem[item._id]}</p>
                      <ExpandMoreIcon onClick={()=>{dispatch(handleRemoveCart(item._id))}} style={{cursor:"pointer"}}/>
                    </div>

                    <p>${item.price * cartItem[item._id]}</p>
                    <p
                      onClick={() =>
                        dispatch(handleRemoveItemFromCart(item._id))
                      }
                      className="cross"
                    >
                      x
                    </p>
                  </div>
                  <hr />
                </>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${allAmount.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Total</p>
                  <b>${(allAmount + 2).toFixed(2)}</b>
                </div>
              </div>
              {userName === undefined ? 
                <button onClick={()=>setShowLogin(true)}>PLEASE LOGIN </button>
                :
                <button onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT</button>
                }
            </div>

            <div className="cart-promoCode">
              <div>
                <p>If you have a promo code, Enter it here</p>
                <div className="promoCodeBox">
                  <span className="promoCodeText1">Get 50% OFF up to ₹149</span>
                  <span className="promoCodeText2">WELCOME50</span>
                </div>
                <div className="cart-promoCode-input">
                  <input
                    type="text"
                    placeholder="promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <img src={cartImg} />
          <p>Your cart is empty</p>
          <Link to="/">
            <button style={{ cursor: "pointer" }}>
              SEE RESTAURANTS NEAR YOU
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Cart;
