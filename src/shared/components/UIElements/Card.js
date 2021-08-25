import React from 'react';

import './Card.css';

const Card = ({className, style, children}) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
