import React, { useEffect, useState } from 'react';
import './Recipes.css';
import { UilHeart } from '@iconscout/react-unicons';

function Recipes({ displayRecipes }) {
  const [favRecipes, setFavRecipes] = useState([]);

  useEffect(() => {
    const favRecipesLocal = JSON.parse(localStorage.getItem('favRecipes')) || [];
    setFavRecipes(favRecipesLocal);
  }, []);

  const toggleFavorite = (id) => {
    const favRecipesLocal = JSON.parse(localStorage.getItem('favRecipes')) || [];
    const index = favRecipesLocal.indexOf(id);

    if (index === -1) {
      favRecipesLocal.push(id);
    } else {
      favRecipesLocal.splice(index, 1);
    }

    localStorage.setItem('favRecipes', JSON.stringify(favRecipesLocal));
    setFavRecipes(favRecipesLocal);
  };

  const includeFavList = (id) => {
    return favRecipes.includes(id) ? 'color-pink' : '';
  };

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
  };

  const getDifficultyText = (nmbr) => {
    switch (nmbr) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Gemiddeld';
      case 3:
        return 'Gevorderd';
      case 4:
        return 'Expert';
      default:
        break;
    }
  };

  return (
    <>
      {displayRecipes.length === 0 ? (
        <p>'Recepten aan het inladen...</p>
      ) : (
        <div className='recept d-flex j-c-space-between'>
          {displayRecipes.map((recipe, index) => (
            <div key={`${recipe.uri}_${index}`} className='card'>
              <div className='p-relative'>
                <img className='card-image' src={recipe.images?.LARGE?.url || recipe.image} />
                <span
                  className={`favorite-icon ${includeFavList(recipe.label)}`}
                  onClick={() => toggleFavorite(recipe.label)}
                >
                  <UilHeart />
                </span>
              </div>
              <span className='card-title'>{recipe.label}</span>
              <br />
              <span className='card-time'>{getDurationText(recipe.duration)}</span>
              <br />
              <span className='card-difficulty'>{getDifficultyText(recipe.difficulty)}</span>
              <br />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Recipes;
