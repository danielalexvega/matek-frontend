import React from 'react';

import Heading from './CurvedHeading';
import "./CurvedHero.css";

const CurvedHero = ({curvedText}) => {
    return (
        <div className="wrapper">
            <Heading text={curvedText} arc={180} radius={200}/>
        </div>
    )
}

export default CurvedHero;
