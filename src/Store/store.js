
import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "../Slices/auth"
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";
import { recipeReducer } from "../Slices/recipe";
import { cartReducer } from "../Slices/cart";



export const store = configureStore({
    reducer:{
        authReducer:authReducer,
        recipeReducer:recipeReducer,
        cartReducer:cartReducer
    },

})