
import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "../Slices/auth"
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";



export const store = configureStore({
    reducer:{
        authReducer:authReducer
    },

})