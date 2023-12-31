import './Detail.css'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const [recipe, setRecipe] = useState([]);
    const [message, setMessage] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        getRecipe();
    }, []);

    async function getRecipe() {
        try {
            const edamamDetailURL = import.meta.env.VITE_EDAMAN_DETAIL_URL;
            const edamamAPIID = import.meta.env.VITE_EDAMAM_ID;
            const edamamAPIKEY = import.meta.env.VITE_EDAMAM_KEY;
            const result = await axios.get(`${edamamDetailURL}/${(id)}/?type=public&app_id=${edamamAPIID}&app_key=${edamamAPIKEY}`);
            setRecipe(result.data?.recipe);
        } catch (e) {
            setMessage('Er ging iets fout. Probeer het later opnieuw.');
        }
    }

    return (
        <>
            {!recipe ? (
                <p>{message ? message : 'Gegevens aan het inladen...'}</p>
            ) : (
                <>
                    <h1>{recipe.label}</h1>
                    <article>
                        <div className='section'>
                            <div className='section-left'><img src={recipe.images?.LARGE?.url || recipe.image} alt={recipe.label} /></div>
                            <div className='section-right'>
                                <article>
                                    <h2>Ingredienten</h2>
                                    <ol>
                                        {recipe?.ingredientLines?.map((ingredient, index) =>
                                            <li key={`${ingredient}_${index}`}>{ingredient} </li>
                                        )}
                                    </ol>
                                </article>
                            </div>
                        </div>
                    </article>
                </>
            )}
        </>
    );

}
export default Detail;