import React from "react";

import "./ProblemCount.css";

const ProblemCount = () => {
    return (
        <div className="problem-count">
            <div className="problem-count__container">
                <div className="container__left-side">
                    <h3>Growing and growing...</h3>
                    <p>
                        Every day our problem set is growing as more teachers
                        add to our numbers
                    </p>
                </div>
                <div className="container__right-side"></div>
            </div>
        </div>
    );
};

export default ProblemCount;
