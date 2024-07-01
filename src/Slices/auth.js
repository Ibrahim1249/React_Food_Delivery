
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile , signOut} from "firebase/auth";
import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

export const loginForm =createAsyncThunk("loginForm",async({auth,email,password})=>{
   try{
      const response = await signInWithEmailAndPassword(auth,email,password)
        return response.user.displayName;
   }catch(err){
      return err.message;
   }
})

// export const SignInWithGoogle =createAsyncThunk("SignInWithGoogle",async({auth})=>{
//   try{
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     return result.user;
//   }catch(err){
//      return err.message;
//   }
// })


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
      handleLogin : (state,action)=>{
         state.login = {...state.login , [action.payload.field] : action.payload.value};
      },
      handleResetForm : (state,action)=>{
        if(action.payload === "Sign Up"){
           state.signUp = {name : "" , email:"" , password:""}
        }else{
          state.login = { email:"" , password:""}
        }
      }
 
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
        }).addCase(loginForm.pending, (state,action)=>{
          state.loading = "loading"
      }).addCase(loginForm.fulfilled , (state,action)=>{
         state.userName = action.payload
      }).addCase(loginForm.rejected,(state,action)=>{
         state.error = action.payload
      })
    }
})

export const authReducer = authSlice.reducer;

export const {handleSignUp , handleLogin , handleResetForm} = authSlice.actions;
