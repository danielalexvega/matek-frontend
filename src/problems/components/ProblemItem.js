import React from "react";
import { Tex } from 'react-tex';

import Card from "../../shared/components/UIElements/Card";
import 'katex/dist/katex.min.css';

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
          <img src={image} alt="problem" />
        </div>
        <div className="problem-item__problem">
          <p className="problem__content">{content}</p>
          <Tex className="problem__katex" texContent={katex}/>
        </div>
        <ul className="problem-item__choices">
          {choices.map((choice, index) => (
            <li key={index}>{choice}</li>
          ))}
        </ul>
        <div className="problem-item__solution"></div>
        <div className="problem-item__info">
          <h4 className="info__author">{author}</h4>
          <p class="info__rating">{rating}</p>
          <ul class="info__courses">
            {courses.map((course) => (
              <li>{course}</li>
            ))}
          </ul>
        </div>
        <div className="problem-item__actions">
          <button>Add to desk</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </Card>
    </li>
  );
};

export default ProblemItem;
