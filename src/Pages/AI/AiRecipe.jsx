import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchRecipe} from "../../Slices/recipe"
import Recipe from "../../Components/Recipe";

function AiRecipe() {
    const dispatch =useDispatch();
    const {recipeData} = useSelector((state)=>{return state.recipeReducer})
  const [userInput, setUserInput] = useState("");
  function handleSubmit(e){
    e.preventDefault();
      dispatch(fetchRecipe(userInput))
      setUserInput("")
  }

  return (
    <>
      <div className="recipe-container">
        <form action="" method="post" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ask for recipe"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>

        {recipeData.length > 0 ? <div className="output-detail">
           {recipeData.map((data,index)=>{
             return <Recipe key={index} data={data}/>
           })}
        </div>:<></>}

 
      </div>
    </>
  );
}

export default AiRecipe;
