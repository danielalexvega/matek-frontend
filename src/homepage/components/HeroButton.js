import React from "react";
import { Link } from "react-router-dom";

const HeroButton = ({to, buttonText, buttonClass}) => {
  return (
    <div className={`hero-button ${buttonClass ? buttonClass : ''}`}>
      <Link to={to}>{buttonText}</Link>
    </div>
  );
};

export default HeroButton;
