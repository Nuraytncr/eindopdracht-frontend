
// Navigation.jsx
import React from 'react';
import './Navigation.css'
import { NavLink } from 'react-router-dom';
import Logo from '../../../assets/Flavor_Maison.svg'
import Image from '../../../assets/image.jpg';
import { UilHeart, UilUser, UilSearch } from '@iconscout/react-unicons'
import { useLocation } from 'react-router-dom';

function Navigation() {
  const showBannerIfHome = useLocation().pathname === '/' ? 'banner' : null;

  return (
    <>
       <div className={showBannerIfHome} style={{ backgroundImage: showBannerIfHome ? `url(${Image})` : ``}}>
        <div className='banner-group'>
          <header>
            <NavLink to="/"><img src={Logo} className='logo' alt='Flavor Mason logo' /></NavLink>
            <nav className='group-link'>
              <ul>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/recepten">Recepten</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/flavor-mood">Flavor Mood</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/over-ons">Over Ons</NavLink>
                </li>
              </ul>
            </nav>

            <div className='group-link-icon'>
              <NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/zoeken"><UilSearch /></NavLink>
              <NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/account"><UilUser /></NavLink>
              <NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/favorieten"><UilHeart /></NavLink>
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
export default Navigation;