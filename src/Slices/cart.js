

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
      cartItem:{},
      cartCount:0
    },
    reducers:{
      handleAddCart:(state,action)=>{
         if(!state.cartItem[action.payload]){
            state.cartItem[action.payload] = 1;
         }else{
            state.cartItem[action.payload]++;
         }
         state.cartCount += 1
      },
      handleRemoveCart:(state,action)=>{
        if(state.cartItem[action.payload] > 0){
          state.cartItem[action.payload]--;
          state.cartCount -=1;
        }else{
         delete state.cartItem[action.payload]
        }
    },
    handleRemoveItemFromCart:(state,action)=>{
       delete state.cartItem[action.payload]
    }
    }

})

export const cartReducer = cartSlice.reducer;

export const {handleAddCart , handleRemoveCart ,handleRemoveItemFromCart} = cartSlice.actions;