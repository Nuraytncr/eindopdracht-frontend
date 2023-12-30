// Contact.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Recepten.css';
import { UilHeart, UilAngleLeftB, UilAngleRightB } from '@iconscout/react-unicons'

function Recepten() {
  const [select, setSelect] = useState('bereidingsTijdLaag');
  const [favRecepts, setFavRecepts] = useState([]);
  const [currentPagination, setCurrentPagination] = useState(null);

  const changeSelect = (event) => {
    //TO DO sorting
    setSelect(event.target.value);
  };

  useEffect(() => {
    const recepts = JSON.parse(localStorage.getItem('favoriteRecepts')) || [];
    setFavRecepts(recepts);
  }, []);

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
  const paginateTo = (id) => {
    setCurrentPagination(id);
     console.log(id);
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
              <div className='card'>
                <div className='p-relative'>
                  <img className='card-image' src='https://placehold.co/600x400/png' />
                  <span className={`favorite-icon ${includeFavList('dd2')}`} onClick={() => toggleFavorite('dd2')}> <UilHeart /></span>
                </div>
                <span className='card-title'>Title</span><br />
                <span className='card-time'>30 minuten</span><br />
                <span className='card-difficulty'>beginner</span><br />
              </div>
              <div className='card'>
                <div className='p-relative'>
                  <img className='card-image' src='https://placehold.co/600x400/png' />
                  <span className={`favorite-icon ${includeFavList('dd1')}`} onClick={() => toggleFavorite('dd1')}> <UilHeart /></span>
                </div>
                <span className='card-title'>Title</span><br />
                <span className='card-time'>30 minuten</span><br />
                <span className='card-difficulty'>beginner</span><br />
              </div>
              <div className='card'>
                <div className='p-relative'>
                  <img className='card-image' src='https://placehold.co/600x400/png' />
                  <span className={`favorite-icon ${includeFavList('dd1')}`} onClick={() => toggleFavorite('dd1')}> <UilHeart /></span>
                </div>
                <span className='card-title'>Title</span><br />
                <span className='card-time'>30 minuten</span><br />
                <span className='card-difficulty'>beginner</span><br />
              </div>
            </div>
            <div className='pagination'>
              <span className={`pagination-button ${currentPagination - 1 < 1 || null ?  'disabled'  : ''} `} onClick={() => currentPagination - 1 < 1 || null ? '' : paginateTo(currentPagination - 1)}><UilAngleLeftB /></span>
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
