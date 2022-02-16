import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import ProblemList from "../components/ProblemList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import Dropdown from "../../shared/components/UIElements/Dropdown";

import "./AllProblems.css";

const AllProblems = () => {
    const [loadedProblems, setLoadedProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const { problems } = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/problems/"
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

        //fetch contentDomains and subdomains

        fetchProblems();
        fetchCourses();
    }, [sendRequest]);

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
        <div className="all-problems__container">
            <ErrorModal error={error} onClear={clearError} />
            <div className="container__title">
                <h1>View all problems</h1>
                <p>
                    Select all the courses, or any single course you want. <br/> (Just
                    make sure you do select a course!)
                </p>
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
                        className="all-problems-list"
                        selectAll={selectAllCourses}
                    />
                </>
            )}
        </div>
    );
};

export default AllProblems;
