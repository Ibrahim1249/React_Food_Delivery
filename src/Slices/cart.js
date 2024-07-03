
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust this import based on your Firebase setup



export const fetchCartData = createAsyncThunk(
   'cart/fetchCartData',
   async (userId) => {
     const userRef = doc(db, 'Users', userId);
     const userSnap = await getDoc(userRef);
     if (userSnap.exists()) {
       return userSnap.data();
     }
     return { cart: {}, isPromo: true };
   }
 );

// Async thunk for updating cart in FireStore
export const updateCartInFireStore = createAsyncThunk(
   'cart/updateCartInFireStore',
   async ({ userId, cartItem }, { getState }) => {
     const userRef = doc(db, 'Users', userId);
     const userSnap = await getDoc(userRef);
     let updateData = { cart: cartItem };
     console.log(updateData)
     
     if (!userSnap.exists()) {
       updateData.userId = userId;
       updateData.isPromo = true;
     } else if (!('isPromo' in userSnap.data())) {
       updateData.isPromo = true;
     }

     await setDoc(userRef, updateData, { merge: true });
     return updateData;
   }
 );



const cartSlice = createSlice({
    name:"cart",
    initialState:{
      cartItem: {},
      isPromo: false,
      loading: false,
      error: null,
      isInitialized: false,
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
        if(state.cartItem[action.payload] === 0){
         delete state.cartItem[action.payload]
        }
    },
    handleRemoveItemFromCart:(state,action)=>{
       delete state.cartItem[action.payload]
    },
    setCart: (state, action) => {
      state.cartItem = action.payload;
    },
     clearCart:(state,action)=>{
        state.cartItem = action.payload
     }
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItem = action.payload.cart || {};
        state.isPromo = action.payload.isPromo || false;
        state.isInitialized = true;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isInitialized = true;
      })
      .addCase(updateCartInFireStore.fulfilled, (state, action) => {
        // We don't need to update the state here as it's already updated in the reducers
      });
  },
})

export const cartReducer = cartSlice.reducer;

export const {handleAddCart , handleRemoveCart ,handleRemoveItemFromCart , clearCart } = cartSlice.actions;