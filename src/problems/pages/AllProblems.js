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
          "http://localhost:5000/api/problems/"
        );
        setLoadedProblems(responseData.problems);
      } catch (error) {}
    };

    fetchProblems();
  }, [sendRequest]);

  return (
    <div className="all-problems__container">
      <ErrorModal error={error} onClear={clearError} />
      <h1>Here are all the problems</h1>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProblems && (
        <ProblemList problems={loadedProblems} />
      )}
    </div>
  );
};

export default AllProblems;
