import './Search.css';
import Input from '../../components/form/Input';
import React, { useState } from 'react';
import axios from 'axios';
import Recipes from '../../components/recipes/Recipes';

function Search() {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState();

  async function searchRecipes(event) {
    setMessage('Aan het zoeken...');
    searchRecipes.timeoutId = setTimeout(async () => {
      try {
        setRecipes([]);
        const searchTerm = event.target.value;
        const edamamURL = import.meta.env.VITE_EDAMAN_URL;
        const result = await axios.get(`${edamamURL}&random=true&q=${searchTerm}`);
        const refinedRecipes = addExtraProperties(result.data?.hits);
        console.log(recipes);
        setRecipes(refinedRecipes.slice(0, 4));
      } catch (e) {
        setMessage('Er ging iets fout. Probeer het later opnieuw.');
      }
    }, 1500);
    console.log(recipes,'test');
  }
  function addExtraProperties(recipes) {
    const modifiedRecipes = recipes.map((recipeMap) => {
      const numberArray = [1, 2, 3, 4];
      const randomNumber = numberArray[Math.floor(Math.random() * numberArray.length)];
      const selectRecipe = recipeMap.recipe
      return {
        ...selectRecipe,
        difficulty: randomNumber,
        duration: randomNumber,
      };
    });
    console.log(modifiedRecipes,'modifß')
    return modifiedRecipes;
  };
  return (
    <>
      <h1>Zoek recepten</h1>
      <Input
        type='text'
        name='search'
        id='search-field'
        label='Zoeken naar recepten (naam, ingrediënten, categories)'
        onChange={searchRecipes}
        labelStyle='hide'
        errors={[]}
      />
      {
        message && recipes.length === 0 ? <><p>{message}</p></>
          : recipes.length >= 1 ? <Recipes
            displayRecipes={recipes || []} 
          />
          : <p>Vul de zoekfunctie hierboven in.</p>
      }
    </>
  );
}
export default Search; 