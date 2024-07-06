
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loadRazorPayScript from '../../Components/razorpay.js';
import useRazorpay from "react-razorpay";
import logo from "../../assets/logo.png"
import { handleChangeData , handlePaymentDetails , clearStateCheckOutDetails} from '../../Slices/checkout.js';
import { clearCart } from '../../Slices/cart.js';


function CheckOut({allAmount}) {
  const [RazorPay] = useRazorpay()
  const {userName , user} = useSelector((state)=>{return state.authReducer})
  const {checkOutDetails} = useSelector((state)=>{return state.checkOutReducer})

  const navigate = useNavigate();
  const dispatch = useDispatch()
  
function handleSubmit(e){
  e.preventDefault();
  handlePayment(allAmount)
}

function handleChange(e){
   const {name , value} = e.target;
    dispatch(handleChangeData({field:name , value}))
}

const handlePayment = async(allAmount)=>{
  if(userName === undefined){
    navigate("/");
   toast.error("Please Login for payment!!!");
   return;
}
const response = await loadRazorPayScript("https://checkout.razorpay.com/v1/checkout.js");
 if (!response) {
   toast.error("RazorPay SDK failed to load. Are you online?");
   return;
 }

 const options = {
   key: import.meta.env.VITE_RAZORPAY_API_KEY, 
   amount: (allAmount + 50)* 100, 
   currency: "INR",
   name: "Foodie.in",
   description: "Test Transaction",
   image: {logo},
   handler: (response) => {
      if(response){
        // console.log(response)
        toast.success("Payment is done successfully !!!")
        dispatch(clearCart({}))
        dispatch(handlePaymentDetails({paymentId : response.razorpay_payment_id , amount : allAmount + 2}))
        dispatch(clearStateCheckOutDetails({}))
        navigate("/")
        return;
      }

   },
   prefill: {
     name:  checkOutDetails.firstName + " " + checkOutDetails.lastName,
     email:user.email,
     contact: checkOutDetails.number
   },
   notes: {
     address: checkOutDetails.street + "," +checkOutDetails.city,
   },
   theme: {
     color: "#fad643",
   },

  
 };

 const paymentObject = new  RazorPay(options)
 paymentObject.open();

}



  return (
    <>
    <form className="place-order" onSubmit={handleSubmit}>
    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input type="text" placeholder="First name" name='firstName' required value={checkOutDetails.firstName} onChange={(e)=>{handleChange(e)}}/>
        <input type="text" placeholder="Last name" name='lastName' required value={checkOutDetails.lastName} onChange={(e)=>{handleChange(e)}}/>
      </div>
 
      <input type="text" placeholder="Street" name='street' required value={checkOutDetails.street} onChange={(e)=>{handleChange(e)}}/>
      <div className="multi-fields">
        <input type="text" placeholder="City" name='city' required value={checkOutDetails.city} onChange={(e)=>{handleChange(e)}}/>
        <input type="text" placeholder="State" name='state' required value={checkOutDetails.state} onChange={(e)=>{handleChange(e)}}/>
      </div>
      <div className="multi-fields">
        <input type="text" placeholder="Zip code" name='zipCode' required value={checkOutDetails.zipCode} onChange={(e)=>{handleChange(e)}}/>
        <input type="text" placeholder="Country" name='country' required value={checkOutDetails.country} onChange={(e)=>{handleChange(e)}}/>
      </div>
      <input type="text" placeholder="Phone" name='number' required value={checkOutDetails.number} onChange={(e)=>{handleChange(e)}}/>
    </div>
    <div className="place-order-right">
      <div className="cart-total">
        <h2>Cart Totals</h2>
        {allAmount > 0 ? 
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>Rs {allAmount}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>Rs {50}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p><b>Rs {allAmount + 50}</b></p>
          </div>
        </div>
       :
       <div>NO CART IS THEIR</div>
        }

        <button type="submit">PROCEED TO PAYMENT</button>
      </div>
    </div>
  </form>
  </>
  )
}

export default CheckOut;