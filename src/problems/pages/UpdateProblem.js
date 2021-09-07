import React from "react";
import { useParams } from "react-router";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import InputList from "../../shared/components/FormElements/InputList";
import InputChoices from "../components/InputChoices";
import KatexPreview from "../components/KatexPreview";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MATCH,
  } from "../../shared/util/validators";

import "./UpdateProblem.css";

const DUMMY_PROBLEMS = [
  {
    id: "p1",
    image: "",
    katex: "int_{a}^{b} f(x)dx = F(b) - F(a)",
    author: "Daniel Vega",
    authorId: "a1",
    rating: "5.0",
    solution: "(-1, 2)",
    choices: ["(-1, 2)", "(-2, 1)", "(-1, -2)", "(1, 2)"],
    content: "Solving the Square",
    courses: ["Algebra 1", "Algebra 2"],
  },
  {
    id: "p2",
    image: "",
    katex: `\\begin{cases} 3x + 5y + z  \\\\ 7x – 2y + 4z \\\\ 
        -6x + 3y + 2z \\end{cases}`,
    author: "Daniel Vega",
    authorId: "a2",
    rating: "5.0",
    solution: "(2, -1)",
    choices: ["(-1, 2)", "(2, -1)", "(-1, -2)", "(2, 1)"],
    content: "Solving the Square",
    courses: ["Algebra 1", "Algebra 2"],
  },
];

const UpdateProblem = () => {
  const problemId = useParams().problemId;

  const identifiedProblem = DUMMY_PROBLEMS.find((p) => p.id === problemId);

  if(!identifiedProblem) {
      return (
          <div className="center">
              <h2>Could not find a problem.</h2>
          </div>
      );
  }
  return <form>

  </form>;
};

export default UpdateProblem;
