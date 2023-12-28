// Contact.jsx
import React from 'react';
import ButtonLink from '../../components/button/ButtonLink';

function NotFound() {
  return (
    <>
      <h1>Sorry deze pagina is gevonden</h1>
      <p>Wellicht kun je de recepten bekijken.</p>
      <ButtonLink to="/recepten">Naar de "over ons" pagina</ButtonLink>
    </>
  );
}
export default NotFound;