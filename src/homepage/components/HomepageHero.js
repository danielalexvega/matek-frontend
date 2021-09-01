import React from "react";

import "./HomepageHero.css";

const HomepageHero = () => {
  return (
    <div className="hero-container" style={{backgroundImage: "url(/gradient2.png)"}}>
      <h1 className="hero-title">Welcome to Matek.</h1>
      <h2 className="hero-copy">An online problem set generator for teachers.</h2>
    </div>
  );
};

export default HomepageHero;
