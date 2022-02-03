import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Gradient from "../../assets/gradient_green.png";

import "./ProblemCount.css";

const ProblemCount = () => {
    const [problemCount, setProblemCount] = useState(0);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const { problems } = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/problems/"
                );
                setProblemCount(problems.length);
            } catch (err) {}
        };

        fetchProblems();
    }, [sendRequest]);

    return (
        <div className="problem-count">
            <ErrorModal error={error} onClear={clearError} />
            <div className="problem-count__container">
                <div className="container__left-side">
                    <h3>Growing and growing...</h3>
                    <p>
                        Every day our problem set is growing as more teachers
                        add to our numbers
                    </p>
                </div>
                <div className="container__right-side">
                    {isLoading && (
                        <div className="center">
                            <LoadingSpinner />
                        </div>
                    )}
                    {!isLoading && problemCount && (
                        <div className="right-side__problemCount-container" style={{backgroundImage: `url(${Gradient})`}}>
                            <div className="problemCount-container__count light">{problemCount}</div>
                            <div className="problemCount-container__text light">problems</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProblemCount;
