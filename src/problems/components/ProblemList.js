import React, { useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import ProblemItem from "./ProblemItem";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./ProblemList.css";

const ProblemList = ({ problems, onDeleteProblem, problemsUserId, className, selectAll }) => {
  const { userId } = useContext(AuthContext);

  // if problems array is empty
  if (problems.length === 0 && problemsUserId === userId) {
    return (
      <div className="problem-list center">
        <Card className="centerCard">
          <h2>Our dog ate your problems.</h2>
          <p>Try selecting a different course. Our you can create some new problems.</p>
          <div className="button-container"></div>
          <Button to="/problems/new">Create Problem</Button>
          <Button type="button" onClick={selectAll}>View All Courses</Button>
        </Card>
      </div>
    );
  }

  if (problems.length === 0 && problemsUserId !== userId) {
    return (
      <div className="problem-list center">
        <Card className="centerCard">
          <h2>Our dog ate our problems for that course.</h2>
          <p>Our more likely, a course isn't selected right now. Please select at least one course.</p>
          <Button type="button" onClick={selectAll}>View All Courses</Button>
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
          course={problem.course}
          subdomain={problem.subdomain}
          hasImage={problem.hasImage}
          onDelete={onDeleteProblem}
        />
      ))}
    </ul>
  );
};

export default ProblemList;
