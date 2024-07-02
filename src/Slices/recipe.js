
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// const url = 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': import.meta.env.VITE_RECIPE_API_KEY,
		'x-rapidapi-host': 'recipe-by-api-ninjas.p.rapidapi.com'
	}
};

export const fetchRecipe = createAsyncThunk("fetchRecipe",async(query)=>{
     try{
         const  response = await axios.get(`https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${query}`,options)
         return response.data;
     }catch(err){
         return err.message
     }
})

const recipeSlice = createSlice({
    name:"recipe",
    initialState:{
       recipeData:[],
       loading:false,
       error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
         builder.addCase(fetchRecipe.pending,(state,action)=>{
             state.loading = true
         }).addCase(fetchRecipe.fulfilled,(state,action)=>{
            state.loading = false;
            state.recipeData = action.payload
         }).addCase(fetchRecipe.rejected,(state,action)=>{
            state.loading = false;
             state.error = action.payload
         })
    }
})

export const  recipeReducer = recipeSlice.reducer;
