import React from "react";
import RecipeView from "./RecipeView";

function RecipeList({recieps, deleteRecipe}) {
  
  // TODO: Display the list of recipes using the structure of table that is provided.
  // TODO: Create at least one additional component that is used by this component.
  // TODO: Each recipe row must have a delete button - <button name="delete">Delete</button> - that deletes the post when clicked

  return (
    <div className="recipe-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cuisine</th>
            <th>Photo</th>
            <th>Ingredients</th>
            <th>Preparation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recieps.map((recipe, index) => (
              <RecipeView
                  recipe={recipe}
                  key={index}
                  deleteRecipe={() => deleteRecipe(index)}
              />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecipeList;
