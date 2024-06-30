
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword , sendEmailVerification , updateProfile , signOut} from "firebase/auth";

export const signUpForm = createAsyncThunk("signUp",async({auth,email,password , name})=>{
  try{
     const response = await createUserWithEmailAndPassword(auth,email,password);
       await updateProfile(response.user , {displayName:name})
      return response.user.displayName;
  }catch(err){
    return err;
  }
})

export const logoutForm = createAsyncThunk("logoutForm",async({auth})=>{
    try{
        const response = await signOut(auth);
         return null;
     }catch(err){
       return err;
     }
})

const authSlice = createSlice({
    name:"authentication",
    initialState:{
        signUp:{
          name:"",
          email:"",
          password:""
        },
        login:{
          email:"",
          password:""
        },
        loading:null,
        error:null ,
        userName:null
    },
    reducers:{
      handleSignUp : (state,action)=>{
        state.signUp = {...state.signUp , [action.payload.field] : action.payload.value};
    
      },
 
    },
    extraReducers:(builder)=>{
         builder.addCase(signUpForm.pending, (state,action)=>{
             state.loading = "loading"
         }).addCase(signUpForm.fulfilled , (state,action)=>{
            state.userName = action.payload
         }).addCase(signUpForm.rejected,(state,action)=>{
            state.error = action.payload
         }).addCase(logoutForm.pending, (state,action)=>{
            state.loading = "loading"
        }).addCase(logoutForm.fulfilled , (state,action)=>{
           state.userName = action.payload
        }).addCase(logoutForm.rejected,(state,action)=>{
           state.error = action.payload
        })
    }
})

export const authReducer = authSlice.reducer;

export const {handleSignUp , handleLogout} = authSlice.actions;
