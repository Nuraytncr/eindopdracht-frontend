// Contact.jsx
import React, { useContext, useState } from 'react';
import './Account.css';
import { Link } from 'react-router-dom';
import Input from '../../components/form/Input';
import Button from '../../components/button/Button';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/Auth';
import axios from "axios";
import MessageBox from '../../components/message_box/message_box';

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState(null);

  async function handleFormSubmit(data) {
    setMessage('Aan het controleren.');
    try {
      const noviURL = import.meta.env.VITE_NOVI_URL;
      const result = await axios.post(`${noviURL}/api/auth/signin`,
        {
          "username": data.username,
          "password": data.password,
        });
      setMessage('Succesvol ingelogd. een ogenblikje, je wordt het doorgestuurd naar het accountoverzicht.');
      login(result.data);
    }
    catch (e) {
      if (e.response?.status === 401) {
        setMessage("De ingevoerde gegevens staan niet in ons systeem. Probeer het opnieuw of maak via de onderstaande link een nieuw account aan.");
      }
      else {
        setMessage('Er ging iets fout. Probeer het later opnieuw.');
      }
    }
  }

  return (
    <div className='text-align-center'>
      <h1>Inloggen</h1>
      <MessageBox message={message} />
      <form className='display-flex flex-direction-column-center margin-auto p-20' onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          type='username'
          name='username'
          id='username-field'
          label='Gebruikersnaam'
          validationRules={{
            required: {
              value: true,
              message: 'Gebruikersnaam is verplicht',
            }
          }}
          register={register}
          errors={errors}
          labelStyle='hide'
        />
        <Input
          type='password'
          name='password'
          id='password-field'
          label='Wachtwoord'
          validationRules={{
            required: {
              value: true,
              message: 'Wachtwoord is verplicht',
            }
          }}
          register={register}
          errors={errors}
          labelStyle='hide'
        />
        <Button
          label='Versturen'
          type='submit'
        />
        <div className='d-flex j-c-space-between'>
          <Link className='link' to='/wachtwoord-vergeten'>Wachtwoord vergeten?</Link>
          <Link className='link' to='/registreren'>Account aanmaken</Link>
        </div>
      </form>
    </div>
  );
}
export default Login;