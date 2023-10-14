import React, { useState } from "react";
import "./App.css";
import RecipeCreate from "./RecipeCreate";
import RecipeList from "./RecipeList";
import RecipeData from "./RecipeData"

function App() {
  // const emptyRecipe = {
  //     name: '',
  //     cuisine: '',
  //     photo: '',
  //     ingredients: '',
  //     preparation: '',
  //     action: 'Create'
  //   }
  const [recipes, setRecipes] = useState(RecipeData);

  // TODO: Add the ability for the <RecipeList /> component to list and delete an existing recipe.
  // TODO: Add the ability for the <RecipeCreate /> component to create new recipes.
    const createRecipe = (newRecipe) => setRecipes((currentRecipes) => [
        ...currentRecipes,
        newRecipe,
    ]);

    const deleteRecipe = (indexToDelete) => setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe, index) => index !== indexToDelete)
    );
  
  return (
    <div className="App">
      <header><h1>Delicious Food Recipes</h1></header>
      <RecipeList recieps={recipes} deleteRecipe={deleteRecipe} />
      <RecipeCreate createRecipe={createRecipe}/>
    </div>
  );
}

export default App;
