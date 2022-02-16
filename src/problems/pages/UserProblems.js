import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ProblemList from "../components/ProblemList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Dropdown from "../../shared/components/UIElements/Dropdown";

import "./UserProblems.css";

const UserProblems = () => {
    const [loadedProblems, setLoadedProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const { problems } = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/problems/user/${userId}`
                );
                problems.reverse();
                setLoadedProblems(problems);
                setFilteredProblems(problems);
            } catch (error) {}
        };

        const fetchCourses = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/courses/"
                );
                const courseList = responseData.courses.map((course) => {
                    return {
                        title: course.courseTitle,
                        id: course.id,
                        selected: false,
                    };
                });

                setFilteredCourses(courseList);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProblems();
        fetchCourses();
    }, [sendRequest, userId]);

    const problemDeleteHandler = (deletedPlaceId) => {
        setLoadedProblems((prevProblems) =>
            prevProblems.filter((problem) => problem.id !== deletedPlaceId)
        );
    };

    const selectCourse = (index) => {
        let newList = [...filteredCourses];
        newList[index].selected = !newList[index].selected;
        setFilteredCourses(newList);
        filterProblemsByCourse(newList);
    };

    const selectAllCourses = () => {
        let newList = filteredCourses.map((course) => {
            return { ...course, selected: true };
        });
        setFilteredCourses(newList);
        filterProblemsByCourse(newList);
    };

    const selectNoCourses = () => {
        let newList = filteredCourses.map((course) => {
            return { ...course, selected: false };
        });
        setFilteredCourses(newList);
        filterProblemsByCourse(newList);
    };

    const filterProblemsByCourse = (courses) => {
        let filterCourseTitles = courses.filter((course) => course.selected);
        filterCourseTitles = filterCourseTitles.map((course) => course.title);

        let newProblemList = loadedProblems.filter((problem) =>
            filterCourseTitles.includes(problem.course)
        );

        setFilteredProblems(newProblemList);
    };

    return (
        <div className="your-problems__container">
            <ErrorModal error={error} onClear={clearError} />
            <div className="container__title-container">
                <h1>Your Desk</h1>
                <p>This is where your saved problems live. You can edit, delete, and clone all of these problems.</p>
            </div>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedProblems && (
                <>
                    <div className="filter__container">
                        <Dropdown
                            headerTitle="Select a course"
                            list={filteredCourses}
                            selectItem={selectCourse}
                            selectAll={selectAllCourses}
                            deselectAll={selectNoCourses}
                        />
                    </div>
                    <ProblemList
                        problems={filteredProblems}
                        onDeleteProblem={problemDeleteHandler}
                        problemsUserId={userId}
                        className="userProblems"
                        selectAll={selectAllCourses}
                    />
                </>
            )}
        </div>
    );
};

export default UserProblems;
