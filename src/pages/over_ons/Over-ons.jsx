import './Over-ons.css'
import React from 'react';
import Image from './over-ons.png';

function OverOns() {
  return (
    <>
      <h1>Welkom bij Flavor Maison!</h1>
      <article>
        <p>
          <em>Een culinaire oase waar smaken tot leven komen en kookavonturen worden omgezet in onvergetelijke ervaringen. </em><br /><br />

          <strong>01.  GEPERSONALISEERDE RECEPTEN. </strong>Ontdek recepten die passen bij jouw stemming, smaakvoorkeuren en culinaire nieuwsgierigheid. Onze gepersonaliseerde aanpak zorgt ervoor dat elk gerecht een weerspiegeling is van jouw unieke stijl.<br />
          <br />
          <strong>02. DIVERSITEIT IN SMAAK.</strong> Van hartige gerechten tot zoete verleidingen, we omarmen de diversiteit van de culinaire wereld. Flavor Maison biedt een uitgebreid scala aan recepten, afgestemd op verschillende keukens en eetgewoonten.<br />
          <br />
          <strong>03. CULINAIRE GEMEENSCHAP.</strong> Sluit je aan bij onze levendige culinaire gemeenschap. Deel jouw creaties, leer van mede-koks en ontdek nieuwe trends in de wereld van eten en drinken.<br />
        </p>
        <div className='section'>
          <div className='section-left'>
            <article>
              <h2>Ons Team</h2>
              <p>Achter Flavor Maison staat een toegewijd team van chefs, foodbloggers en technologieliefhebbers. We streven ernaar om niet alleen recepten te delen, maar ook kennis en passie voor koken over te brengen. Onze experts zorgen ervoor dat elke stap in jouw kookreis wordt ondersteund met betrouwbare begeleiding en inspiratie.</p>

              <h2>Verken, Creëer, Geniet</h2>
              <p>Flavor Maison nodigt je uit om verder te gaan dan de standaard kookervaring. Verken nieuwe smaken, creëer culinaire meesterwerken en geniet van het plezier van huisgemaakt eten. Of je nu een doorgewinterde chef-kok bent of net begint, er is altijd iets nieuws te ontdekken in de wereld van smaak.</p>

              <h2>Samen Op Ontdekkingsreis</h2>
              <p>Kom bij ons en maak deel uit van een culinaire ontdekkingsreis. Samen zullen we de eindeloze mogelijkheden van de keuken verkennen en elk moment omtoveren tot een gelegenheid om te genieten van smaakvolle creaties. Flavor Maison is niet zomaar een platform; het is een thuis voor alle liefhebbers van koken en eten. Welkom in onze smaakvolle wereld!</p>
            </article>
          </div>
          <div className='section-right'><img src={Image} /></div>
        </div>
      </article>
    </>
  );
}
export default OverOns;