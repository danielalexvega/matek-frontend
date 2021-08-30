import React from "react";

import ProblemList from "../components/ProblemList";
import "./AllProblems.css";

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

const AllProblems = () => {
  return (
    <div className="all-problems__container">
      <h1>Here are all the problems</h1>
      <ProblemList problems={DUMMY_PROBLEMS} />
    </div>
  );
};

export default AllProblems;
