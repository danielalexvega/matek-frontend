import React from "react";
import { Tex } from "react-tex";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "./ProblemItem.css";
import "katex/dist/katex.min.css";

const ProblemItem = ({
  id,
  image,
  katex,
  author,
  authorId,
  rating,
  solution,
  choices,
  content,
  courses,
}) => {
  return (
    <li className="problem-item">
      <Card className="problem-item__content">
        <div className="problem-item__image">
          {image && <img src={image} alt="problem" />}
        </div>
        <div className="problem-item__problem">
          <p className="problem__content">{content}</p>
          <Tex className="problem__katex" texContent={katex} />
        </div>
        <ul className="problem-item__choices">
          {choices.map((choice, index) => (
            <li key={index}>{choice}</li>
          ))}
        </ul>
        <div className="problem-item__solution"></div>
        <div className="problem-item__info">
          <p className="info__author">Written by {author}</p>
          <p class="info__rating"> Rating: {rating}</p>
          <div className="info__courses-container">
            Courses:
            <ul class="info__courses">
              {courses.map((course) => (
                <li>{course}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="problem-item__actions">
          <Button inverse>Add to desk</Button>
          <Button to={`/problems/${id}`}>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </Card>
    </li>
  );
};

export default ProblemItem;
