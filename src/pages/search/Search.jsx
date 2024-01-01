import './Search.css';
import Input from '../../components/form/Input';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recipes from '../../components/recipes/Recipes';
import { addExtraProperties } from '../../components/recipes/Helper';

function Search() {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState();
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    const timeOut = setTimeout(async () => searchRecipes(), 850);
    return () => clearTimeout(timeOut);
  }, [searchInput]);

  async function searchRecipes() {
    if (!searchInput) {
      return;
    }

    setMessage('Aan het zoeken...');
    try {
      setRecipes([]);
      const edamamURL = import.meta.env.VITE_EDAMAN_URL;
      const result = await axios.get(`${edamamURL}&random=true&q=${searchInput}`);
      const refinedRecipes = addExtraProperties(result.data?.hits.slice(0, 4));
      setRecipes(refinedRecipes);
    } catch (e) {
      setMessage('Er ging iets fout. Probeer het later opnieuw.');
    }
  }

  return (
    <>
      <h1>Zoek recepten</h1>
      <Input
        type='text'
        name='search'
        id='search-field'
        label='Zoeken naar recepten (naam, ingrediënten, categories)'
        onChangeCallBack={setSearchInput}
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