import React from "react";
import { useParams } from "react-router";

import ProblemList from "../components/ProblemList";

const DUMMY_PROBLEMS = [
  {
    id: "p1",
    image: "",
    katex: `Solve the following system of equation.
    `,
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
    katex: `Solve the following system of equation.
            \\begin{alignat*}{3}
            6x & {} - {} & 12y & {}={} & 24 \\
            -x & {} - {} & 6y & {}={} & 4 
            \\end{alignat}`,
    author: "Daniel Vega",
    authorId: "a2",
    rating: "5.0",
    solution: "(2, -1)",
    choices: ["(-1, 2)", "(2, -1)", "(-1, -2)", "(2, 1)"],
    content: "Solving the Square",
    courses: ["Algebra 1", "Algebra 2"],
  },
];

const UserProblems = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PROBLEMS.filter(problem => problem.authorId === userId);
  return <ProblemList problems={loadedPlaces} />;
};

export default UserProblems;
