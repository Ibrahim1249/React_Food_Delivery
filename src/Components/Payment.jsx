



function Payment({setShowLogin}) {
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
            key: "rzp_test_dXKz97krnHQgXP", // Replace with your Razorpay key ID
            amount: total * 100, // Razorpay requires the amount in paise (smallest currency unit)
            currency: "INR",
            name: "Amazon.in",
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
      
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
      
    }
    
  return (
    <>
      
    </>
  )
}

export default Payment;