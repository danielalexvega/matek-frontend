import React from "react";
import { useParams } from "react-router";

import ProblemList from "../components/ProblemList";

import DUMMY_PROBLEMS from "../../shared/DUMMY_PROBLEMS";

const UserProblems = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PROBLEMS.filter(problem => problem.authorId === userId);
  return <ProblemList problems={loadedPlaces} />;
};

export default UserProblems;
