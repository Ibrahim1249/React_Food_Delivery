
import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "../Slices/auth"
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";
import { recipeReducer } from "../Slices/recipe";



export const store = configureStore({
    reducer:{
        authReducer:authReducer,
        recipeReducer:recipeReducer
    },

})