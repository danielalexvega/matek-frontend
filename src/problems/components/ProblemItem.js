import React, { useState, useContext } from "react";
import { InlineTex } from "react-tex";

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
    katexEquation,
    author,
    authorId,
    choices,
    content,
    course,
    subdomain,
    onDelete,
    hasImage,
}) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { isLoggedIn, userId, token } = useContext(AuthContext);
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
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/problems/${id}`,
                "DELETE",
                null,
                { Authorization: "Bearer " + token }
            );
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
                        <Button primary onClick={cancelDeleteHandler}>
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
                    {hasImage && (
                        <div className="problem-item__image">
                            {image && <img src={image} alt="problem" />}
                        </div>
                    )}
                    <div className="problem-item__problem">
                        <div className="problem__course">
                            <span className="course__title">{course}</span> | {content}
                        </div>
                        <div className="problem__subdomain">{subdomain}</div>
                        <p className="problem__katex">
                            <InlineTex texContent={katex} />
                        </p>
                        {katexEquation && <p className="problem__katexEquation center">
                            <InlineTex texContent={katexEquation} />
                        </p>}
                    </div>
                    <ul className="problem-item__choices">
                        {choices.map((choice, index) => (
                            <li key={index}>
                                <InlineTex texContent={choice.value} />
                            </li>
                        ))}
                    </ul>
                    <div className="problem-item__solution"></div>
                    <div className="problem-item__info">
                        <p className="info__author">Written by {author}</p>
                        {/* <p className="info__rating"> Rating: {rating}</p> */}
                    </div>
                    <div className="problem-item__actions">
                        {/* {isLoggedIn && authorId !== userId && (
                            <Button primary>Add to desk</Button>
                        )} */}
                        {isLoggedIn && authorId === userId && (
                            <Button to={`/problems/${id}`}>Edit</Button>
                        )}
                        {isLoggedIn && authorId === userId && (
                            <Button danger onClick={showDeleteWarningHandler}>
                                Delete
                            </Button>
                        )}
                        {isLoggedIn && authorId === userId && (
                            <Button primary className="clone-button" to={`/problems/${id}/clone`}>Clone</Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default ProblemItem;
