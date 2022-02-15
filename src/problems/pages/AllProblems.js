import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import ProblemList from "../components/ProblemList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import Dropdown from "../../shared/components/UIElements/Dropdown";

import "./AllProblems.css";

const AllProblems = () => {
    const [loadedProblems, setLoadedProblems] = useState();
    const [filteredProblems, setFilteredProblems] = useState();
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isSelected, setIsSelected] = useState([]);

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
                console.log(courseList);
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

    const selectItem = (index) => {
        let newList = [...filteredCourses];
        newList[index].selected = !newList[index].selected;
        setFilteredCourses(newList);
        filterProblemsByCourse(newList);
    };

    const selectAll = () => {
        let newList = filteredCourses.map((course) => {
            return { ...course, selected: true };
        });
        setFilteredCourses(newList);
        filterProblemsByCourse(newList);
    };

    const selectNone = () => {
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
            <h1>View all problems</h1>

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
                            selectItem={selectItem}
                            selectAll={selectAll}
                            deselectAll={selectNone}
                            isSelected={isSelected}
                        />
                    </div>
                    <ProblemList
                        problems={filteredProblems}
                        onDeleteProblem={problemDeleteHandler}
                        className="all-problems-list"
                    />
                </>
            )}
        </div>
    );
};

export default AllProblems;
