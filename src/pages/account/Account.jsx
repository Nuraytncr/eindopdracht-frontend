import React, { useContext } from 'react';
import './Account.css';
import ButtonLink from '../../components/button/ButtonLink';
import { AuthContext } from '../../context/Auth';
import { Redirect } from '../../helpers/redirect';
import Login from './Login';

function Account() {
  const { user } = useContext(AuthContext);

  function renderBasedOnUser() {
    if (user.user) {
      return (<div className='text-align-center'>
        <h1>Account</h1>
        <p>Welkom {user.user}</p>
        <ButtonLink to='/recepten'>Recepten</ButtonLink>
        <br />
        <ButtonLink to='/logout'>Uitloggen</ButtonLink>
      </div>);
    }
    return <Login />;
  }

  return  renderBasedOnUser();
}
export default Account;