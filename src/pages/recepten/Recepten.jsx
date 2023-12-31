// Contact.jsx
import React, { useEffect, useState } from 'react';
import './Recepten.css';
import Pagination from '../../components/pagination/Pagination';
import axios from 'axios';
import Recipes from '../../components/recipes/Recipes';

function Recepten() {
  const [select, setSelect] = useState('');
  const [currentPagination, setCurrentPagination] = useState(1);

  const [recipes, setRecipes] = useState([]);
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [message, setMessage] = useState(null);

  const recipesPerPagination = 4;

  const changeSelect = (event) => {
    const val = event?.target?.value;
    setSelect(val);
    renderRecipes(null);
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

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
    return modifiedRecipes;
  };

  async function fetchRandomRecipes() {
    try {
      const edamamURL = import.meta.env.VITE_EDAMAN_URL;
      const result = await axios.get(`${edamamURL}&random=true&q=${getRandomSearchTerm()}`);
      const refinedRecipes = addExtraProperties(result.data?.hits);
      setRecipes(refinedRecipes);
      setDisplayRecipes(refinedRecipes.slice(0, recipesPerPagination));
     
    } catch (e) {
      setMessage('Er ging iets fout. Probeer het later opnieuw.');
    }
  }

  function getRandomSearchTerm() {
    const searchTerms = ["pizza", "ice cream", "bread", "waffle", "soup"];
    return searchTerms[Math.floor(Math.random() * searchTerms.length)];
  }

  function getSortRecipes() {
    switch (select) {
      case 'bereidingsTijdLaag':
        return recipes.sort((a, b) => b.duration - a.duration);
      case 'bereidingsTijdHoog':
        return recipes.sort((a, b) => a.duration - b.duration);
      case 'MoeilijkheidsgraadBeginner':
        return recipes.sort((a, b) => b.difficulty - a.difficulty);
      case 'MoeilijkheidsgraadExpert':
        return recipes.sort((a, b) => a.difficulty - b.difficulty);
      default:
        return recipes;
    }
  }

  function renderRecipes(nmbr) {
    const startIndex = ((nmbr || currentPagination) - 1) * recipesPerPagination;
    const endIndex = startIndex + recipesPerPagination;
    const displayedRecipes = getSortRecipes().slice(startIndex, endIndex);
    setDisplayRecipes(displayedRecipes);
  }

  return (
    <>
      <div>
        <div className='d-flex j-c-space-between align-items'>
          <h1>Recepten</h1>
          <select id="sort-select" defaultValue='sorteren' onChange={changeSelect}>
            <option value='sorteren' disabled>Sorteren</option>
            <option value="bereidingsTijdLaag">Bereidingstijd laag - hoog</option>
            <option value="bereidingsTijdHoog">Bereidingstijd hoog - laag</option>
            <option value="MoeilijkheidsgraadBeginner">Moeilijkheidsgraag beginner - expert</option>
            <option value="MoeilijkheidsgraadExpert">Moeilijkheidsgraag expert - beginner</option>
          </select>
        </div>
        {message || recipes.length == 0
          ? <p>{message ? message : 'Recepten aan het inladen...'}</p>
          :
          <div className='recept-section d-flex'>
            <div className='sidebar'>
              <span className='sidebar-title'>Recepten</span> <br />
            </div>
            <div>
              <Recipes
                displayRecipes={displayRecipes || []}
              />
              <Pagination
                currentPagination={currentPagination}
                recipesPerPagination={recipesPerPagination}
                totalRecipes={recipes.length}
                setCurrentPagination={setCurrentPagination}
                adjustRecipesDisplayBasedOnPagination={renderRecipes} />
            </div>
          </div>
        }

      </div>
    </>
  );
}
export default Recepten;
