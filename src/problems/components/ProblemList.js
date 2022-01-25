import React, { useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import ProblemItem from "./ProblemItem";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./ProblemList.css";

const ProblemList = ({ problems, onDeleteProblem, problemsUserId, className }) => {
  const { userId } = useContext(AuthContext);

  // if problems array is empty
  if (problems.length === 0 && problemsUserId === userId) {
    return (
      <div className="problem-list center">
        <Card>
          <h2>No problems found. Maybe create one?</h2>
          <Button to="/problems/new">Create Problem</Button>
        </Card>
      </div>
    );
  }

  if (problems.length === 0 && problemsUserId !== userId) {
    return (
      <div className="problem-list center">
        <Card>
          <h2>This user has not created any problems yet.</h2>
          <Button to="/problems">View Other Problems</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className={`problem-list ${className}`}>
      {problems.map((problem) => (
        <ProblemItem
          key={problem._id}
          id={problem.id}
          image={`${process.env.REACT_APP_ASSET_URL}/${problem.image}`}
          katex={problem.katex}
          author={problem.author}
          authorId={problem.authorId}
          solution={problem.solution}
          choices={problem.choices} 
          content={problem.subjectContent}
          courses={problem.courses}
          hasImage={problem.hasImage}
          onDelete={onDeleteProblem}
        />
      ))}
    </ul>
  );
};

export default ProblemList;
