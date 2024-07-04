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
import toast from "react-hot-toast";
import { getDoc, doc , updateDoc } from 'firebase/firestore';
import {auth , db } from "../../firebase"

function Cart({setShowLogin, setAllAmount , allAmount }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cartReducer);
  const { userName } = useSelector((state) => state.authReducer);
  const [promoText, setPromoText] = useState("");

  function calculateTotalAmount() {
    let total = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        total += itemInfo.price * cartItem[item];
      }
    }
    setAllAmount(total * 45);
  }


  useEffect(() => {
    calculateTotalAmount();
  }, [cartItem]);

  const handlePromoCodeClick = async(e)=>{
    let amount = 0;
     e.preventDefault()
     const user = auth.currentUser;
     if(!user){
      toast.error("please login to access promo code!");
      return;
     }
     try{
        const userDocRef = doc(db,"Users",user?.uid);
       
        const userDocSnap = await getDoc(userDocRef)
        console.log(userDocSnap.data())
        if(userDocSnap.exists()){
          // if user data is exist in fireStore
          const userData = userDocSnap.data();
            if(promoText === "WELCOME100"){ // if user written property WELCOME100
              
               if(userData.isPromo){ // check if user is already is used or not if it true it means user i valid for access
                amount = allAmount - 100;
                setAllAmount(amount);
                  toast.success("Congratulations you successfully applied PromoCode!!")
                await updateDoc(userDocRef, {
                  isPromo: false
                });
                setPromoText("")
               }else{ // means isPromo is false means used is already being used the promoCode
                toast.error("Promo code already used");
                return; 
               }
            }else{ // this means user not write properly the promoCode
              toast.error("Invalid Promo write properly!!")
              return;
            }
        }
    
     }catch(err){ // this is basically a fire store error
         toast.error(err.message);
         return;
     }
  }

  console.log(cartItem )
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
                    <p>Rs {item.price * 45}</p>
                    <div className="expand-box">
                      <ExpandLessIcon onClick={()=>{dispatch(handleAddCart(item._id))}} style={{cursor:"pointer"}}/>
                      <p>{cartItem[item._id]}</p>
                      <ExpandMoreIcon onClick={()=>{dispatch(handleRemoveCart(item._id))}} style={{cursor:"pointer"}}/>
                    </div>

                    <p>Rs {item.price * cartItem[item._id] * 45}</p>
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
                  <p>Rs {allAmount.toFixed(2) }</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>Rs {50}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Total</p>
                  <b>Rs {(allAmount + 50).toFixed(2)}</b>
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
                  <span className="promoCodeText1">Get OFF up to 100</span>
                  <span className="promoCodeText2">WELCOME100</span>
                </div>
                <div className="cart-promoCode-input">
                  <input
                    type="text"
                    placeholder="promo code"
                    required
                    value={promoText}
                    onChange={(e) => setPromoText(e.target.value)}
                  />
                  <button onClick={(e)=>{handlePromoCodeClick(e)}}>Submit</button>
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
