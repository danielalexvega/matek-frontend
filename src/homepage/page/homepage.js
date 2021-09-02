import React from "react";

import HomepageHero from "../components/HomepageHero";
import FullWidthContainer from "../components/FullWidthContainer";

import "./Homepage.css";

const homepage = () => {
  return (
    <div className="page-container">
      <HomepageHero />
      <FullWidthContainer backgroundColor="#1867A0" color="#EDF6FC" title="What is Matek?">
        Matek is an online database of problems created by teachers as a source for worksheets, quizzes, and tests. Teachers can search for problems, add them to their desk, or they can write their own problems and upload them. All problems are written in KaTex, a math typesetting library for the web. This will allow teachers to create content that will be displayed in the correct mathematical notation. We can worry about writing problems that access our students' knowledge, instead of worrying about how to format the equations.
      </FullWidthContainer>
    </div>
  );
};

export default homepage;
