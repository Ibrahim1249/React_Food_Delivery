
import { useSelector } from "react-redux";
import OrderItem from "../../Components/OrderItem";
function Order() {
    const {paymentDetails} = useSelector((state)=>{return state.checkOutReducer});
  return (
    <>
      <div className="order-container">
          <div className="order-title">
              <p>Sr No</p>
              <p>Payment Id</p>
              <p>Payment Amount</p>
              <p>Status</p>
          </div>
          <hr />
          {paymentDetails && paymentDetails.map((data,index)=>{
             return <OrderItem key={index} index={index} item={data} status="done"/>
          })}
      </div>
    </>
  )
}

export default Order