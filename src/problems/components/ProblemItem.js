import React, { useState, useContext } from "react";
import { Tex } from "react-tex";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import "./ProblemItem.css";
import "katex/dist/katex.min.css";

const ProblemItem = ({
  id,
  image,
  katex,
  author,
  rating,
  solution,
  choices,
  content,
  courses,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("Deleting...");
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="problem-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this problem?</p>
      </Modal>
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
              <li key={index}>{choice.value}</li>
            ))}
          </ul>
          <div className="problem-item__solution"></div>
          <div className="problem-item__info">
            <p className="info__author">Written by {author}</p>
            {/* <p className="info__rating"> Rating: {rating}</p> */}
            <div className="info__courses-container">
              Courses:
              <ul className="info__courses">
                {courses.map((course, index) => (
                  <li key={`course ${index}`}>{course}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="problem-item__actions">
            {isLoggedIn && <Button inverse>Add to desk</Button>}
            {isLoggedIn && <Button to={`/problems/${id}`}>Edit</Button>}
            {isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ProblemItem;
