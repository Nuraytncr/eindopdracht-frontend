import './Favorite.css';
import React from 'react';
import RecipesHorizontal from '../../components/recipes/RecipesHorizontal';

function Favorite() {

  return (
    <>
      <div className='text-align-center'>
        <h1>Favorieten</h1>
        <RecipesHorizontal />
      </div>
    </>
  );
}
export default Favorite; 