import React, { useState, useContext } from "react";
import { Tex } from "react-tex";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
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
  onDelete,
  hasImage
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoggedIn, userId } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  if (!choices) {
    choices = [];
  }

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:5000/api/problems/${id}`, "DELETE");
      onDelete(id);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
      <li className="problem-item" key={id}>
        <Card className="problem-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          {hasImage && <div className="problem-item__image">
            {image && <img src={`http://localhost:5000/${image}`} alt="problem" />}
          </div>}
          <div className="problem-item__problem">
            <p className="problem__content">{content}</p>
            <Tex className="problem__katex" texContent={katex} />
          </div>
          <ul className="problem-item__choices">
            {choices.map((choice, index) => (
              <li key={index}>
                <Tex texContent={choice.value} />
                </li>
            ))}
          </ul>
          <div className="problem-item__solution"></div>
          <div className="problem-item__info">
            <p className="info__author">Written by {author}</p>
            {/* <p className="info__rating"> Rating: {rating}</p> */}
            <div className="info__courses-container">
              Courses:
              <ul className="info__courses">
                {courses.map((course) => (
                  <li key={course.id}>{course.value}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="problem-item__actions">
            {isLoggedIn && authorId !== userId && (
              <Button inverse>Add to desk</Button>
            )}
            {isLoggedIn && authorId === userId && (
              <Button to={`/problems/${id}`}>Edit</Button>
            )}
            {isLoggedIn && authorId === userId && (
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
