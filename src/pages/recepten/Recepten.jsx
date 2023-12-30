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
  const [message, setMessage] = useState(null);

  const recipesPerPagination = 4;

  const changeSelect = (event) => {
    const val = event?.target?.value || event;
    setSelect(val);

    switch (val) {
      case 'bereidingsTijdLaag':
        setRecipes([...recipes].sort((a, b) => a.duration - b.duration));
        break;
      case 'bereidingsTijdHoog':
        setRecipes([...recipes].sort((a, b) => b.duration - a.duration));
        break;
      case 'MoeilijkheidsgraadBeginner':
        setRecipes([...recipes].sort((a, b) => a.difficulty - b.difficulty));
        break;
      case 'MoeilijkheidsgraadExpert':
        setRecipes([...recipes].sort((a, b) => b.difficulty - a.difficulty ));
        break;
      default:
        break;
    }
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
      const createdRecipes = addExtraProperties(result.data?.hits);

      setRecipes(createdRecipes);
      changeSelect('bereidingsTijdLaag');
    } catch (e) {
      setMessage('Er ging iets fout. Probeer het later opnieuw.');
    }
  }
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
  const getDurationText = (nmbr) =>
  {
    
    switch (nmbr) {
      case 1:
       return '30 minuten';
        break;
      case 2:
       return '45 minuten';
        break;
      case 3:
          return '1 uur';
        break;
      case 4:
      return '2 uur';
        break;
      default:
        break;
    }
  }
  const getDifficultyText = (nmbr) =>
  {
    
    switch (nmbr) {
      case 1:
       return 'Beginner';
        break;
      case 2:
       return 'Gemiddeld';
        break;
      case 3:
          return 'Gevorded';
        break;
      case 4:
      return 'Expert';
        break;
      default:
        break;
    }
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
        { message || recipes.length == 0
            ? <p>{ message ? message : 'Recepten aan het inladen...'}</p>
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
              <span className={`pagination-button ${currentPagination - 1 < 1 || null ? 'disabled' : ''} `} onClick={() => currentPagination - 1 < 1 || null ? '' : paginateTo(currentPagination - 1)}><UilAngleLeftB /></span>
              <span className='pagination-button pagination-selected' onClick={() => paginateTo(1)}>1</span>
              <span className='pagination-button' onClick={() => paginateTo(2)}>2</span>
              <span className='pagination-button' onClick={() => paginateTo(3)}>3</span>
              <span className='pagination-button' onClick={() => paginateTo(4)}>4</span>
              <span className='pagination-button' onClick={() => paginateTo(5)}>5</span>
              <span className='pagination-button cursor-default'>...</span>
              <span className='pagination-button' onClick={() => paginateTo(20)}>20</span>
              <span className='pagination-button' onClick={() => paginateTo(currentPagination + 1)}><UilAngleRightB /></span>
            </div>
          </div>
        </div>
}

      </div>
    </>
  );
}
export default Recepten;
