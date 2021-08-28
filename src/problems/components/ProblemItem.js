import React from "react";

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
      <div className="problem-item__image">
        <img src={image} alt="problem" />
      </div>
      <div className="problem-item__problem">
        <p className="problem__content">{content}</p>
        <h2 className="problem__katex">{katex}</h2>
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
        <ul class="info__courses">{courses.map(course => (
            <li>{course}</li>
        ))}</ul>
      </div>
    </li>
  );
};

export default ProblemItem;
