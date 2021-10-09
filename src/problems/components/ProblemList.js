import React from "react";

import Card from "../../shared/components/UIElements/Card";
import ProblemItem from "./ProblemItem";
import Button from "../../shared/components/FormElements/Button";
import "./ProblemList.css";

const ProblemList = ({ problems }) => {
  // problems should be a prop, an array of problems
  // if problems array is empty
  if (problems.length === 0) {
    return (
      <div className="problem-list center">
        <Card>
          <h2>No problems found. Maybe create one?</h2>
          <Button to="/problems/new">Create Problem</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="problem-list">
      {problems.map((problem) => (
        <ProblemItem
          key={problem._id}
          id={problem.id}
          image={problem.image}
          katex={problem.katex}
          author={problem.author}
          authorId={problem.authorId}
          solution={problem.solution}
          choices={problem.choices} //array of choice objects
          content={problem.subjectContent}
          courses={problem.courses}
        />
      ))}
    </ul>
  );
};

export default ProblemList;
