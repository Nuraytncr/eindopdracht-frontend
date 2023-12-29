import React, { useContext, useEffect } from 'react';
import './Account.css';
import ButtonLink from '../../components/button/ButtonLink';
import { AuthContext } from '../../context/Auth';
import { navigateTo } from '../../helpers/Navigate';
import { useNavigate } from 'react-router-dom';

function Account() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('username:', user)
    if (!user?.username) {
      navigateTo('/login', navigate);
    }
  }, []);

  return (<div className='text-align-center'>
    <h1>Account</h1>
    <p>Welkom {user?.username}</p>
    <ButtonLink to='/recepten'>Recepten</ButtonLink>
    <br />
    <ButtonLink to='/logout'>Uitloggen</ButtonLink>
  </div>);
}
export default Account;