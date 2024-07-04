import React from 'react'

function OrderItem({item , index , status}) {
  return (
     <>
       <div className="order-item">
           <p>{index + 1}</p>
           <p>{item.paymentId}</p>
           <p>Rs {item.amount}</p>
           <p>{status}</p>
       </div>

     </>
  )
}

export default OrderItem