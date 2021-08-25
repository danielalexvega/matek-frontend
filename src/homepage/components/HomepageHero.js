import React from 'react';

// import button 
import HeroButton from './HeroButton';

import "./HomepageHero.css";


const HomepageHero = () => {
    return (
        <div className="hero-container">
            <h1>Welcome to Matek.</h1>
            <h2>An online problem set for teachers.</h2>
            <div className="hero-container__button-container">
                <HeroButton to="/" buttonText="Button 1"/>
                <HeroButton to="/" buttonText="Button 2"/>
                <HeroButton to="/" buttonText="Button 3"/>
            </div>
        </div>
    )
}

export default HomepageHero;
