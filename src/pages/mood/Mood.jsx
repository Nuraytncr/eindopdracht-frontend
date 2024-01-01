import './Mood.css';
import React, { useState } from 'react';
import axios from 'axios';
import Recipes from '../../components/recipes/Recipes';
import { addExtraProperties } from '../../components/recipes/Helper';
import MessageBox from '../../components/message_box/message_box';
import Button from '../../components/button/Button';

function Mood() {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState();
  
  function loadRecipes(mood) 
  {
    if (!mood) {
      return;
    }
    setMessage('Recepten aan het inladen...');
    fetchRecipes(mood);
  }

  async function fetchRecipes(mood) {
    try {
      setRecipes([]);
      const edamamURL = import.meta.env.VITE_EDAMAN_URL;
      const result = await axios.get(`${edamamURL}&random=true&q=${getSearchTermBasedOnMood(mood)}`);
      const refinedRecipes = addExtraProperties(result.data?.hits.slice(0, 6));
      setRecipes(refinedRecipes);
    } catch (error) {
      console.log('Error loading recipes:', error);
      setMessage('Er ging iets fout. Probeer het later opnieuw.');
    }
  }
  const getSearchTermBasedOnMood = (mood) => {
    switch (mood) {
      case 'Blij':
        return ' "chicken breasts"';
      case 'Gestresst':
        return 'salmon';
      case 'Avontuurlijk':
        return 'pasta';
      case 'Gespannen':
        return 'avocado';
      default:
        break;
    }
  };
  return (
    <>
      <div className='text-align-center'>
        {
          recipes.length >= 1 ? 
          <>
          <h1>Jouw Flavor Mood</h1>
          <p>Gefeliciteerd! Je unieke smaakprofiel is onthuld door Flavor Maison. Gebaseerd op jouw huidige stemming en culinaire voorkeuren, presenteren we met trots een selectie aan recepten die perfect passen bij jouw moment. Van hartverwarmende comfortgerechten tot avontuurlijke smaakexplosies, deze suggesties zijn speciaal samengesteld om jouw eetervaring te verrijken.</p>
          <Recipes
            displayRecipes={recipes}
            receptAdditionalStyle='w-75vw'
             cardAdditionalStyle='w-20vw'

          /> </>
            : <>
              <h1>Hoe voel je vandaag?</h1>
              <MessageBox message={message} />
              <div className='display-flex flex-direction-column-center margin-auto p-20 w-25vw'>
                <Button
                  label='Blij'
                  onClickCallBack={() => loadRecipes('Blij')}
                />< br />
                <Button
                  label='Gestresst'
                  onClickCallBack={() => loadRecipes('Gestresst')}
                />< br />
                <Button
                  label='Avontuurlijk'
                  onClickCallBack={() => loadRecipes('Avontuurlijk')}
                />< br />
                <Button
                  label='Gespannen'
                  onClickCallBack={() => loadRecipes('Gespannen')}
                />
              </div>
            </>
        }
      </div>
    </>
  );
}
export default Mood; 