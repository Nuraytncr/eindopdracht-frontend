import React, {useContext, useState} from 'react';
import './Account.css';
import { Link } from 'react-router-dom';
import Input from '../../components/form/Input';
import Button from '../../components/button/Button';
import MessageBox from '../../components/message_box/message_box';
import { useForm, useWatch} from 'react-hook-form';
import {AuthContext} from '../../context/Auth'
import axios from "axios";

function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);
  const [message, setMessage]  = useState('');

  async function handleFormSubmit(data) {

    try{
      setMessage('Aan het registreren.');
      const noviURL = import.meta.env.VITE_NOVI_URL;
      const result = await axios.post(`${noviURL}/api/auth/signup`,
      {
          username: data.username,
          email: data.email,
          password: data.password,
          role: ['user']
      });
    
      setMessage('Succesvol geregistreerd. Je kunt nu inloggen via de onderstaande link.');
    }
    catch(e)
    {
      if(e.response.data.message === 'This username is already in use')
      {
        setMessage(" Deze gebruikersnaam is al in gebruik. Log via de onderstaande link in." );
      }
      else
      {
        setMessage('Er ging iets fout. Probeer het later opnieuw.');
      }
    }
  }

  return (
    <div className='text-align-center'>
      <h1>Registreren</h1>
      <MessageBox message={message} />
      <form className='display-flex flex-direction-column-center margin-auto p-20' onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
          type='text'
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
        /> <Input
          type='email'
          name='email'
          id='email-field'
          label='E-mailadres'
          validationRules={{
            required: {
              value: true,
              message: 'E-mailadres is verplicht',
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
        /> <Input
        type='password'
        name='password-confirmation'
        id='password-confirmation-field'
        label='Bevestig Wachtwoord'
        validationRules={{
          required: {
            value: true,
            message:  (val) => {
                if (useWatch('password') != val) {
                  return 'Uw wachtwoorden komen niet overeen.';
                }
                else
                return 'Bevestig Wachtwoord is verplicht';
          }}
        }}
        register={register}
        errors={errors}
        labelStyle='hide'
      />
        <Button
          label='Aanmaken'
          type='submit'
        />
          <Link className='link text-align-center' to='/login'>Al een account? Inloggen</Link>
      </form>
    </div>
  );
}
export default Register;