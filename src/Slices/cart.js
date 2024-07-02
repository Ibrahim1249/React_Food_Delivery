

import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name:"cart",
    initialState:{
      cartItem:{},
      promoCode:true
    },
    reducers:{
      handleAddCart:(state,action)=>{
         if(!state.cartItem[action.payload]){
            state.cartItem[action.payload] = 1;
         }else{
            state.cartItem[action.payload]++;
         }
      },
      handleRemoveCart:(state,action)=>{
        if(state.cartItem[action.payload] > 0){
          state.cartItem[action.payload]--;
        }else{
         delete state.cartItem[action.payload]
        }
    },
    handleRemoveItemFromCart:(state,action)=>{
       delete state.cartItem[action.payload]
    },
     handlePromoCode:(state,action)=>{
        state.promoCode = action.payload;
     }

    }

})

export const cartReducer = cartSlice.reducer;

export const {handleAddCart , handleRemoveCart ,handleRemoveItemFromCart , handlePromoCode} = cartSlice.actions;