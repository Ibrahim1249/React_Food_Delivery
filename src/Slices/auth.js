
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile , signOut} from "firebase/auth";
import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function notification(message){
   toast.success(message, {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
}

export const signUpForm = createAsyncThunk("signUp",async({auth,email,password , name})=>{
  try{
     const response = await createUserWithEmailAndPassword(auth,email,password);
       await updateProfile(response.user , {displayName:name})
        notification("Successfully Sign Up")
      return  response.user;
   
  }catch(err){
   toast.error(err.message);
    return err;
  }
})

export const logoutForm = createAsyncThunk("logoutForm",async({auth})=>{
    try{
        const response = await signOut(auth);
        notification("Successfully Logout!!")
         return undefined;
     }catch(err){
      toast.error(err.message);
       return err;
     }
})

export const loginForm =createAsyncThunk("loginForm",async({auth,email,password})=>{
   try{
      const response = await signInWithEmailAndPassword(auth,email,password)
      notification("Successfully Login !!")
        return response.user;
   }catch(err){
      toast.error(err.message);
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
        loading:false,
        error:null ,
        userName:undefined,
        user:null,
   
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
      },
      initializeFromStorage: (state) => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          state.user = user;
          state.userName = user.displayName || user.name;
        }
        state.isInitialized = true;
      },
 
    },
    extraReducers:(builder)=>{
         builder.addCase(signUpForm.pending, (state,action)=>{
             state.loading = true;
             state.error = null;
         }).addCase(signUpForm.fulfilled , (state,action)=>{
            state.loading = false;
            state.error = null;
            state.user = action.payload;
            state.userName = action.payload.displayName || action.payload.email;
         }).addCase(signUpForm.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.user = null;
            state.userName = null;
         }).addCase(logoutForm.pending, (state,action)=>{
            state.loading = true;
            state.error = null;
        }).addCase(logoutForm.fulfilled, (state,action)=>{
         state.loading = false;
         state.error = null;
         state.user = action.payload;
         state.userName = action.payload;
        }).addCase(logoutForm.rejected,(state,action)=>{
         state.loading = false;
         state.error = action.payload;
         state.user = null;
         state.userName = null;
        }).addCase(loginForm.pending, (state,action)=>{
         state.loading = true;
         state.error = null;
      }).addCase(loginForm.fulfilled , (state,action)=>{
         state.loading = false;
         state.error = null;
         state.user = action.payload;
         state.userName = action.payload.displayName || action.payload.email;
      }).addCase(loginForm.rejected,(state,action)=>{
         state.loading = false;
         state.error = action.payload;
         state.user = null;
         state.userName = null;

      })
    }
})

export const authReducer = authSlice.reducer;

export const {handleSignUp , handleLogin , handleResetForm ,  initializeFromStorage } = authSlice.actions;
