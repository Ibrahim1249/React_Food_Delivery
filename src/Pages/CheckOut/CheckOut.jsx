
import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loadRazorPayScript from '../../Components/razorpay.js';
import useRazorpay from "react-razorpay";
import logo from "../../assets/logo.png"

function CheckOut({allAmount}) {
  const [RazorPay] = useRazorpay()
  const {userName} = useSelector((state)=>{return state.authReducer})
  const navigate = useNavigate();

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
     amount: (allAmount + 2)* 100, 
     currency: "USD",
     name: "Foodie.in",
     description: "Test Transaction",
     image: {logo},
     handler: (response) => {
       console.log(response); // {razorpay_payment_id:"pay_ONOmIIDgEshfBM"}
       
     },
     prefill: {
       name: "Amitabh Bachchan",
       email: "email@example.com",
       contact: 123456789,
     },
     notes: {
       address: "Delhi",
     },
     theme: {
       color: "#F37254",
     },
   };

   const paymentObject = new  RazorPay(options)
   paymentObject.open();

}

function handleSubmit(e){
  e.preventDefault();
  handlePayment(allAmount)
}

  
  

  return (
    <>
    <form className="place-order" onSubmit={handleSubmit}>
    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input type="text" placeholder="First name" required />
        <input type="text" placeholder="Last name" required />
      </div>
 
      <input type="text" placeholder="Street" required />
      <div className="multi-fields">
        <input type="text" placeholder="City" required />
        <input type="text" placeholder="State" required />
      </div>
      <div className="multi-fields">
        <input type="text" placeholder="Zip code" required />
        <input type="text" placeholder="Country" required />
      </div>
      <input type="text" placeholder="Phone" required />
    </div>
    <div className="place-order-right">
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${allAmount}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p><b>${allAmount + 2}</b></p>
          </div>
        </div>

        <button type="submit">PROCEED TO PAYMENT</button>
      </div>
    </div>
  </form>
  </>
  )
}

export default CheckOut;