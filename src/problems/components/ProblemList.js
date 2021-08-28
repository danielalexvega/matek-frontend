import React from "react";

import Card from "../../shared/components/UIElements/Card";
import ProblemItem from "./ProblemItem";
import "./ProblemList.css";

const ProblemList = ({ problems }) => {
  // problems should be a prop, an array of problems
  // if problems array is empty
  if (problems.length === 0) {
    return (
      <div className="problem-list center">
        <Card>
          <h2>No problems found. Maybe create one?</h2>
          <button>Create Problem</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="problem-list">
      {problems.map((problem) => (
        <ProblemItem
          key={problem.id}
          id={problem.id}
          image={problem.imgUrl}
          katex={problem.katex}
          author={problem.author}
          authorId={problem.authorId}
          rating={problem.rating}
          solution={problem.solution}
          choices={problem.choices}
          content={problem.content}
          courses={problem.courses}
        />
      ))}
    </ul>
  );
};

export default ProblemList;
