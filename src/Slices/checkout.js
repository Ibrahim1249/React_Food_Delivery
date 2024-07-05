
import { createSlice } from "@reduxjs/toolkit";

const checkOutSlice = createSlice({
    name:"checkout",
    initialState:{
       checkOutDetails:{
         firstName:"",
         lastName:"",
         street:"",
         city:"",
         state:"",
         zipCode:"",
         country:"",
         number:""
       },
       paymentDetails:[]
    },
    reducers:{
        handleChangeData:(state,action)=>{
             state.checkOutDetails = {...state.checkOutDetails , [action.payload.field] : action.payload.value}
        },
        handlePaymentDetails:(state,action)=>{
             state.paymentDetails = [...state.paymentDetails , action.payload]
        },
        clearStateCheckOutDetails:(state,action)=>{
           state.checkOutDetails = {
            firstName:"",
            lastName:"",
            street:"",
            city:"",
            state:"",
            zipCode:"",
            country:"",
            number:""
           }
        },
    }
})
export const checkOutReducer = checkOutSlice.reducer
export const {handleChangeData , handlePaymentDetails , clearStateCheckOutDetails } = checkOutSlice.actions;
