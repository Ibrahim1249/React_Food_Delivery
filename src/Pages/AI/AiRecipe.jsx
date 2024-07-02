import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../../Slices/recipe";
import Recipe from "../../Components/Recipe";
import toast from "react-hot-toast";
import SkeletonLayout from "../../Components/SkeletonLayout";


function AiRecipe() {
  const dispatch = useDispatch();
  const { recipeData, loading } = useSelector((state) => {
    return state.recipeReducer;
  });
  const { userName } = useSelector((state) => {
    return state.authReducer;
  });
  const [userInput, setUserInput] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (userName === undefined) {
      toast.error("Please login to access Recipe");
      return;
    } else {
      dispatch(fetchRecipe(userInput));
      setUserInput("");
    }
  }

  return (
    <>
      <div className="recipe-container">
        <form action="" method="post" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ask for recipe"
            required
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>

        {userName !== undefined &&
          (loading ? (
            <div className="output-detail">
            {[...Array(4)].map((_,index)=>{
               return  <SkeletonLayout key={index} />
            })}
            </div>
          ) : recipeData !== undefined ? (
            recipeData.length > 0 ? (
              <div className="output-detail">
                {recipeData.map((data, index) => (
                  <Recipe key={index} data={data} />
                ))}
              </div>
            ) : (
              <div className="output-detail">
                <p
                  style={{
                    textAlign: "center",
                    color: "#c1121f",
                    fontSize: "22px",
                  }}
                >
                  No Recipe is found. Please try later or enter a proper name!
                </p>
              </div>
            )
          ) : null)}
      </div>
    </>
  );
}

export default AiRecipe;
