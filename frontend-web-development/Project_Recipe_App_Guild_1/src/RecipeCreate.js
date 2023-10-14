import React, { useState } from "react";

function RecipeCreate({createRecipe}) {
  const initialForm = {
    name: '',
    cuisine: '',
    photo: '',
    ingredients: '',
    preparation: '',
  }
  const [formData, setFormData] = useState({...initialForm});

  const handleChange = ({target}) => {
    console.log(formData.name);
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createRecipe(formData);
    setFormData({...initialForm});
  };

  // TODO: When the form is submitted, a new recipe should be created, and the form contents cleared.
  // TODO: Add the required input and textarea form elements.
  // TODO: Add the required submit and change handlers
  
  // const [name, setName] = useState("");
  // const [cuisine, setCuisine] = useState("");
  // const [photo, setPhoto] = useState("");
  // const [rating, setRating] = useState("");
  // const [ingredients, setIngredients] = useState("");
  // const [preparation, setPreparation] = useState("");
  
  return (
    <form name="create" onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <input
                  id='name'
                  name='name'
                  type='text'
                  required={true}
                  onChange={handleChange}
                  value={formData.name}
                  maxLength={30}
              />
            </td>
            <td>
              <input
                  id='cuisine'
                  name='cuisine'
                  type='text'
                  required={true}
                  onChange={handleChange}
                  value={formData.cuisine}
                  maxLength={30}
              />
            </td>
            <td>
              <input
                  id='photo'
                  name='photo'
                  type='url'
                  required={true}
                  onChange={handleChange}
                  value={formData.photo}
              />
            </td>
            <td>
              <textarea
                  id="ingredients"
                  name="ingredients"
                  required={true}
                  rows={2}
                  onChange={handleChange}
                  value={formData.ingredients}
              />
            </td>
            <td>
              <textarea
                  id="preparation"
                  name="preparation"
                  required={true}
                  rows={2}
                  onChange={handleChange}
                  value={formData.preparation}
              />
            </td>
            <td>
              <button type="submit">Create</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default RecipeCreate;
