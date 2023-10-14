import React from "react";

function RecipeView({recipe, key, deleteRecipe}) {
  
  // TODO: Display the list of recipes using the structure of table that is provided.
  // TODO: Create at least one additional component that is used by this component.
  // TODO: Each recipe row must have a delete button - <button name="delete">Delete</button> - that deletes the post when clicked

  return (
    <tr className="recipe" key={key}>
      <td>{recipe.name}</td>
      <td>{recipe.cuisine}</td>
      <td>
        <img src={recipe.photo} alt={recipe.name} key={key}/>
      </td>
      <td className="content_td">{recipe.ingredients}</td>
      <td className="content_td">{recipe.preparation}</td>
      <td>
        <button name="delete" onClick={deleteRecipe}>Delete</button>
      </td>
    </tr>
  );
}

export default RecipeView;
