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
        backgroundColor="#124e78"
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
        expressionHeader="And here's how the problem is formatted."
        expression="$$\begin{cases} -x - 5y - 5z = 2 \\ 4x - 5y + 4z = 19 \\ x + 5y - z = -20 \end{cases}$$"
      >
        Here are some examples of problems that can be rendered with <Tex texContent="\KaTeX"/>
      </KatexExample>
      <KatexExample
        body={`And here is the syntax to write a expression involving squaring complex numbers with fractions.`}
        expressionHeader="And here's how the problem is formatted."
        expression="$$(\frac{\sqrt{3}}{2}-\frac{\sqrt{2}}{5}i)^2$$"
        expressionClassName="frac"
        className="border-top mb-3"
      ></KatexExample>

      <FullWidthContainer
        backgroundColor="#124e78"
        color="#EDF6FC"
        title="Why Matek?"
        width="100%"
      >
        Every school year, I would go through my old worksheets, problems and examples I'd written from last year. Sometimes I wouldn't even bother looking and I would just write new problems from scratch. I would spend a lot of time making sure the solutions were whole numbers or reasonable fractions, and that they were appropriate for where we were in the curriculum. It was work, but I honestly kind of liked it. <br/><br/>

        That being said, why isn't there a giant database of problems that I can refer to? A problem set that I can add to if I don't find what I'm looking for.  <br/><br/>

        Right now I'm focused on Algebra 1, Algebra 2, and PreCal. Eventually I'll move into Geometry and Calculus. Geometry requires more bells and whistles to properly represent angles and circles and shapes. We'll get there. Give me time. 
      </FullWidthContainer>
      <ProblemCount />
    </div>
  );
};

export default homepage;
