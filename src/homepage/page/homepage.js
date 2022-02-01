import React from "react";
import { Tex } from "react-tex";
import HomepageHero from "../components/HomepageHero";
import FullWidthContainer from "../components/FullWidthContainer";
import KatexExample from "../components/KatexExample";
import ProblemCount from "../components/ProblemCount";

import "./homepage.css";

const homepage = () => {
  return (
    <div className="page-container">
      <HomepageHero />
      <FullWidthContainer
        backgroundColor="#1867A0"
        color="#EDF6FC"
        title="What is Matek?"
        width="100%"
      >
        Matek is an online database of problems created by teachers as a source
        for worksheets, quizzes, and tests. Teachers can search for problems,
        add them to their desk, or write their own problems and upload them. All
        problems are written in <Tex texContent="\KaTeX"/>, a
        math typesetting library for the web. This allows teachers to create
        content that will be displayed in the correct mathematical notation. We
        can worry about writing problems that access our students' knowledge,
        instead of worrying about how to format the equations.
      </FullWidthContainer>
      <KatexExample
        body={`Here is the syntax to write a systems of equations problem with three variables.`}
        expression="\begin{cases} -x - 5y - 5z = 2 \\ 4x - 5y + 4z = 19 \\ x + 5y - z = -20 \end{cases}"
      >
        Here is an example of a problem that can be rendered with <Tex texContent="\KaTeX"/>
      </KatexExample>
      <ProblemCount />
    </div>
  );
};

export default homepage;
