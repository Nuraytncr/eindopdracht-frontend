// Contact.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Recepten.css';
import { UilHeart, UilAngleLeftB, UilAngleRightB } from '@iconscout/react-unicons'
import axios from 'axios';

function Recepten() {
  const [select, setSelect] = useState('bereidingsTijdLaag');
  const [favRecepts, setFavRecepts] = useState([]);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState(null);

  const recipesPerPagination = 4;

  const changeSelect = (event) => {
    const val = event?.target?.value;
    setSelect(val);
  };

  useEffect(() => {
    const recepts = JSON.parse(localStorage.getItem('favoriteRecepts')) || [];
    setFavRecepts(recepts);
    fetchRandomRecipes();
  }, []);

  useEffect(() => {
    setRecipes(getSortRecipes());
  }, [recipes, select]);

  async function fetchRandomRecipes() {
    try {
      const edamamURL = import.meta.env.VITE_EDAMAN_URL;
      const result = await axios.get(`${edamamURL}&random=true&q=${getRandomSearchTerm()}`);
      setTotalPages(Math.ceil(result.data?.hits?.length / recipesPerPagination));
      const createdRecipes = addExtraProperties(result.data?.hits);
      setRecipes(createdRecipes);
    } catch (e) {
      setMessage('Er ging iets fout. Probeer het later opnieuw.');
    }
  }

  const getSortRecipes = () => {
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
        break;
    }
  };

  const toggleFavorite = (id) => {
    const favoriteRecepts = JSON.parse(localStorage.getItem('favoriteRecepts')) || [];
    const index = favoriteRecepts.indexOf(id);

    if (index === -1) {
      favoriteRecepts.push(id);

    } else {
      favoriteRecepts.splice(index, 1);
    }
    localStorage.setItem('favoriteRecepts', JSON.stringify(favoriteRecepts));
    setFavRecepts(favoriteRecepts);
  };

  const includeFavList = (id) => {
    return favRecepts.includes(id) ? 'color-pink' : '';
  }
  const addExtraProperties = (data) => {
    const modifiedRecipes = data.map(recipeMap => {
      const numberArray = [1, 2, 3, 4];

      const randomNumber = numberArray[Math.floor(Math.random() * numberArray.length)];

      const modfiedRecipe = recipeMap.recipe;
      return {
        ...modfiedRecipe,
        difficulty: randomNumber,
        duration: randomNumber,
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
  const getDurationText = (nmbr) => {

    switch (nmbr) {
      case 1:
        return '30 minuten';
      case 2:
        return '45 minuten';
      case 3:
        return '1 uur';
      case 4:
        return '2 uur';
      default:
        break;
    }
  }
  const getDifficultyText = (nmbr) => {

    switch (nmbr) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Gemiddeld';
      case 3:
        return 'Gevorded';
      case 4:
        return 'Expert';
      default:
        break;
    }
  }

  function renderPaginationButtons() {
    const buttons = [];
    const pagesToShow = 5;
    let farthestNeighbour;
    for (let i = Math.max(1, currentPagination - 2); i <= Math.min(totalPages, currentPagination + 2); i++) {
      
      farthestNeighbour = i;
      buttons.push(
        <span
          key={i}
          className={`pagination-button ${i === currentPagination ? 'pagination-selected' : ''}`}
          onClick={() => paginateTo(i)}
        >
          {i}
        </span>
      );
    }
    if (totalPages - farthestNeighbour > 1) {
      buttons.push(<span key="ellipsis" className='pagination-button'>...</span>);
      buttons.push(
        <span
          key={totalPages}
          className={`pagination-button ${totalPages === currentPagination ? 'pagination-selected' : ''}`}
          onClick={() => paginateTo(totalPages)}
        >
          {totalPages}
        </span>
      );
    }

    return buttons;
  }
  return (
    <>
      <div>
        <div className='d-flex j-c-space-between align-items'>
          <h1>Recepten</h1>
          <select id="sort-select" value={select} onChange={changeSelect}>
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
                    <span className='card-time'>{getDurationText(recipe.duration)}</span><br />
                    <span className='card-difficulty'>{getDifficultyText(recipe.difficulty)}</span><br />
                  </div>
                ))}
              </div>
              <div className='pagination'>
                <span
                  className={`pagination-button ${currentPagination - 1 < 1 ? 'disabled' : ''}`}
                  onClick={() => currentPagination - 1 < 1 ? '' : paginateTo(currentPagination - 1)}>
                  <UilAngleLeftB />
                </span>
                {renderPaginationButtons()}
                <span
                  className={`pagination-button ${currentPagination + 1 > totalPages ? 'disabled' : ''}`}
                  onClick={() => currentPagination + 1 > totalPages ? '' : paginateTo(currentPagination + 1)}>
                  <UilAngleRightB />
                </span></div>
            </div>
          </div>
        }

      </div>
    </>
  );
}
export default Recepten;
