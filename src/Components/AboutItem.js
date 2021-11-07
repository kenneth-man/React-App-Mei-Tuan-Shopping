import React from 'react';

const AboutItem = ({ name, location, email, picture, role, quote, isCEO = false }) => {
    return (
        <div className={isCEO ? 'about__item about__item--ceo col fh' : 'about__item col fh'}>
            <img src={picture} alt='about-img'/>
            <h1>{name}</h1>
            <h1>{role}</h1>
            <h2>{location}</h2>
            <h2>{email}</h2>
            <p>{quote}</p>
        </div>
    )
}

export default AboutItem;