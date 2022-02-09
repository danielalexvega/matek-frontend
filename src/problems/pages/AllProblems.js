import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import ProblemList from "../components/ProblemList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./AllProblems.css";

const AllProblems = () => {
  const [loadedProblems, setLoadedProblems] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/problems/"
        );
        setLoadedProblems(responseData.problems);
      } catch (error) {}
    };

    fetchProblems();
  }, [sendRequest]);

  const problemDeleteHandler = (deletedPlaceId) => {
    setLoadedProblems((prevProblems) =>
      prevProblems.filter((problem) => problem.id !== deletedPlaceId)
    );
  };

  return (
    <div className="all-problems__container">
      <ErrorModal error={error} onClear={clearError} />
      <h1>View all problems</h1>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProblems && (
        <ProblemList problems={loadedProblems} onDeleteProblem={problemDeleteHandler} className="all-problems-list"/>
      )}
    </div>
  );
};

export default AllProblems;
