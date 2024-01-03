import React, { useEffect, useState } from 'react';
import './Recipes.css';
import Recipe from './Recipe';
import MessageBox from '../../components/message_box/message_box';

function RecipesHorizontal() {
  const [favRecipes, setFavRecipes] = useState([]);

  useEffect(() => {
    const favRecipesLocal = JSON.parse(localStorage.getItem('favRecipes')) || [];
    setFavRecipes(favRecipesLocal);
  }, []);

  return (
    <>
      {favRecipes.length === 0 ? (
       <MessageBox message={'Nog geen favoriete recepten. Voeg een favoriet toe.'} />
      ) : (
        <div className={`recept d-flex j-c-space-between`}>
          {favRecipes.map((recipeId, index) => (
            <div key={`${favRecipes}_${index}`}>
              <Recipe 
              recipeId={recipeId}              
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default RecipesHorizontal;
