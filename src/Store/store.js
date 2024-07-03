
import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "../Slices/auth"
import { recipeReducer } from "../Slices/recipe";
import { cartReducer } from "../Slices/cart";
import { checkOutReducer } from "../Slices/checkout";



export const store = configureStore({
    reducer:{
        authReducer:authReducer,
        recipeReducer:recipeReducer,
        cartReducer:cartReducer,
        checkOutReducer:checkOutReducer
    },

})