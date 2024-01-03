import React, { useEffect, useState } from 'react';
import './Recipes.css';
import { UilHeart } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import { addExtraProperties } from './Helper';
import axios from 'axios';

function Recipe({ recipeId, }) {
    const [favRecipes, setFavRecipes] = useState([]);// TO-DO: Re-use favorites functions instead of duplicating them
    const [recipe, setRecipe] = useState([]); 

    useEffect(() => {
        fetchRecipe();
        const favRecipesLocal = JSON.parse(localStorage.getItem('favRecipes')) || [];
        setFavRecipes(favRecipesLocal);
    }, []);

    async function fetchRecipe() {
        try {
            const edamamIDURL = import.meta.env.VITE_EDAMAN_ID_URL;
            const edamamAPIID = import.meta.env.VITE_EDAMAM_ID;
            const edamamAPIKEY = import.meta.env.VITE_EDAMAM_KEY;
            const result = await axios.get(`${edamamIDURL}/${recipeId}/?type=public&app_id=${edamamAPIID}&app_key=${edamamAPIKEY}`);
            const refinedRecipe = addExtraProperties(result.data?.recipe);
            setRecipe(refinedRecipe)
        } catch (error) {
            console.log(error);
        }
    }

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
            <div className={`card `}>
                <div className='p-relative'>
                    <Link to={`/recepten/detail/${recipeId}`} ><img className='card-image' src={recipe.images?.LARGE?.url || recipe.image} /></Link>
                    <span
                        className={`favorite-icon ${includeFavList(recipeId)}`}
                        onClick={() => toggleFavorite(recipeId)}
                    >
                        <UilHeart />
                    </span>
                </div>
                <div className='card-description'>
                    <span className='card-title'>{recipe.label}</span>
                    <br />
                    <span className='card-time'>{getDurationText(recipe.duration)}</span>
                    <br />
                    <span className='card-difficulty'>{getDifficultyText(recipe.difficulty)}</span>
                    <br />
                </div>
            </div>
        </>
    );
}
export default Recipe;
