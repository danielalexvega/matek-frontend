import React from "react";

import ProblemList from "../components/ProblemList";
import "./AllProblems.css";

import DUMMY_PROBLEMS from "../../shared/DUMMY_PROBLEMS";

const AllProblems = () => {
  return (
    <div className="all-problems__container">
      <h1>Here are all the problems</h1>
      <ProblemList problems={DUMMY_PROBLEMS} />
    </div>
  );
};

export default AllProblems;
