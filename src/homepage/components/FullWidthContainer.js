import React from "react";

import "./FullWidthContainer.css";

const FullWidthContainer = (props) => {
  const backgroundColor = props.backgroundColor ? props.backgroundColor : "";
  const color = props.color ? props.color : "";
  const className = props.className ? props.className : "";

  return (
    <div
      className={`full-width-container ${className}`}
      style={{ backgroundColor: `${backgroundColor}`, color: `${color}` }}
    >
      <div className={`full-width-container__content ${className}`} style={{width: `${props.width}`}}>
        {props.title && <h3 className="full-width-container__title">{props.title}</h3>}
        <p className="full-width-container__body">{props.children}</p>
      </div>
    </div>
  );
};

export default FullWidthContainer;
