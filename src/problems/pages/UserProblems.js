import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ProblemList from "../components/ProblemList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./UserProblems.css"; 

const UserProblems = () => {
  const [loadedProblems, setLoadedProblems] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/problems/user/${userId}`
        );
        setLoadedProblems(responseData.problems);
      } catch (error) {}
    };

    fetchProblems();
  }, [sendRequest, userId]);

  const problemDeleteHandler = (deletedPlaceId) => {
    setLoadedProblems((prevProblems) =>
      prevProblems.filter((problem) => problem.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProblems && (
        <ProblemList
          problems={loadedProblems}
          onDeleteProblem={problemDeleteHandler}
          problemsUserId={userId}
          className="userProblems"
        />
      )}
    </React.Fragment>
  );
};

export default UserProblems;