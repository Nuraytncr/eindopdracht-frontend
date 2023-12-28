// Contact.jsx
import React, {useEffect, useContext} from 'react';
import './Account.css';
import {AuthContext} from '../../context/Auth';

function Logout() {

  const { logout:logoutUser } = useContext(AuthContext);
  useEffect(() => {
    logoutUser();
}, []);

  return (
    <div className='text-align-center'>
      <h1>...Aan het uitloggen</h1>
    </div>
  );
}
export default Logout;