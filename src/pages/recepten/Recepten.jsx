// Contact.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Recepten.css';
import { UilHeart, UilAngleLeftB, UilAngleRightB } from '@iconscout/react-unicons'
import axios from 'axios';

function Recepten() {
  const [select, setSelect] = useState('bereidingsTijdLaag');
  const [favRecepts, setFavRecepts] = useState([]);
  const [currentPagination, setCurrentPagination] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const recipesPerPagination = 4;

  const changeSelect = (event) => {
    //TO DO sorting
    setSelect(event.target.value);
  };

  useEffect(() => {
    const recepts = JSON.parse(localStorage.getItem('favoriteRecepts')) || [];
    setFavRecepts(recepts);
    fetchRandomRecepts();

  }, []);
  async function fetchRandomRecepts() {
    try {
      const edamamURL = import.meta.env.VITE_EDAMAN_URL;
      const result = await axios.get(`${edamamURL}&random=true&q=${getRandomSearchTerm()}`);
      setRecipes(addExtraProperties(result.data?.hits));
    } catch (e) {
      console.log('error', e);
    }
  }
  const toggleFavorite = (id) => {
    const favoriteRecepts = JSON.parse(localStorage.getItem('favoriteRecepts')) || [];
    const index = favoriteRecepts.indexOf(id);

    if (index === -1) {
      favoriteRecepts.push(id);
      console.log('Added to favorites:', id);

    } else {
      favoriteRecepts.splice(index, 1);
      console.log('Removed from favorites:', id);
    }
    localStorage.setItem('favoriteRecepts', JSON.stringify(favoriteRecepts));
    setFavRecepts(favoriteRecepts);
  };

  const includeFavList = (id) => {
    return favRecepts.includes(id) ? 'color-pink' : '';
  }
  const addExtraProperties = (data) => {
    console.log(recipes);
    const modifiedRecipes = data.map(recipeMap => {
      const difficultyLevels = ["beginner", "Gevorded", "Gemiddeld", "expert"];
      const durations = ["30 minuten", "1 uur", "45 minuten", "2 uur"];

      const randomDifficulty = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];
      const randomDuration = durations[Math.floor(Math.random() * durations.length)];

      const modfiedRecipe = recipeMap.recipe;
      return {
        ...modfiedRecipe,
        difficulty: randomDifficulty,
        duration: randomDuration,
      };
    });
    return modifiedRecipes;
  }
  const getRandomSearchTerm = () => {
    const searchTerms = ["pizza", "ice cream", "bread", "waffle", "soup"];
    return searchTerms[Math.floor(Math.random() * searchTerms.length)];
  }
  const paginateTo = (id) => {
    setCurrentPagination(id);
  }
  return (
    <>
      <div>
        <div className='d-flex j-c-space-between align-items'>
          <h1>Recepten</h1>
          <select id="sort-select" className='' value={select} onChange={changeSelect}>
            <option value="bereidingsTijdLaag">Bereidingstijd laag - hoog</option>
            <option value="bereidingsTijdHoog">Bereidingstijd hoog - laag</option>
            <option value="MoeilijkheidsgraadBeginner">Moeilijkheidsgraag beginner - expert</option>
            <option value="MoeilijkheidsgraadExport">Moeilijkheidsgraag expert - beginner</option>
          </select>
        </div>
        <div className='recept-section d-flex'>
          <div className='sidebar'>
            <span className='sidebar-title'>Recepten</span> <br />
            <span className='options'>Recepten</span> <br />
            <span className='options'>Recepten</span> <br />
            <span className='options'>Recepten</span> <br />
            <span className='options'>Recepten</span> <br />
            <span className='options'>Recepten</span> <br />
          </div>
          <div>
            <div className='recept d-flex j-c-space-between'>
              {recipes.slice(0, recipesPerPagination).map((recipe) => (
                <div key={recipe.uri} className='card'>
                  <div className='p-relative'>
                    <img className='card-image' src={recipe.images.LARGE?.url || recipe.image} />
                    <span className={`favorite-icon ${includeFavList(recipe.label)}`} onClick={() => toggleFavorite(recipe.label)}> <UilHeart /></span>
                  </div>
                  <span className='card-title'>{recipe.label}</span><br />
                  <span className='card-time'>{recipe.duration}</span><br />
                  <span className='card-difficulty'>{recipe.difficulty}</span><br />
                </div>
              ))}
            </div>
            <div className='pagination'>
              <span className={`pagination-button ${currentPagination - 1 < 1 || null ? 'disabled' : ''} `} onClick={() => currentPagination - 1 < 1 || null ? '' : paginateTo(currentPagination - 1)}><UilAngleLeftB /></span>
              <span className='pagination-button pagination-selected' onClick={() => paginateTo(100)}>1</span>
              <span className='pagination-button' onClick={() => paginateTo(100)}>2</span>
              <span className='pagination-button' onClick={() => paginateTo(100)}>3</span>
              <span className='pagination-button' onClick={() => paginateTo(100)}>4</span>
              <span className='pagination-button' onClick={() => paginateTo(100)}>5</span>
              <span className='pagination-button' onClick={() => paginateTo(100)}>...</span>
              <span className='pagination-button' onClick={() => paginateTo(100)}>100</span>
              <span className='pagination-button' onClick={() => paginateTo(currentPagination + 1)}><UilAngleRightB /></span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
export default Recepten;
