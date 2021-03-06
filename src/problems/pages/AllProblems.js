import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import ProblemList from "../components/ProblemList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import Button from "../../shared/components/FormElements/Button";
import Dropdown from "../../shared/components/UIElements/Dropdown";

import "./AllProblems.css";

const AllProblems = () => {
    const [loadedProblems, setLoadedProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loadedContentDomains, setLoadedContentDomains] = useState([]);
    const [filteredContentDomains, setFilteredContentDomains] = useState([]);
    const [loadedSubdomains, setLoadedSubdomains] = useState([]);
    const [filteredSubdomains, setFilteredSubdomains] = useState([]);

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
        const fetchContentDomains = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/contentDomains/"
                );
                const contentDomainList = responseData.contentDomains.map(
                    (domain) => {
                        return {
                            title: domain.domainTitle,
                            id: domain.id,
                            course: domain.courses[0].value,
                            subdomains: domain.subdomains,
                            selected: false,
                        };
                    }
                );

                const subDomainList = [];
                for (let i = 0; i < contentDomainList.length; i++) {
                    if (contentDomainList[i].subdomains !== undefined) {
                        for (
                            let j = 0;
                            j < contentDomainList[i].subdomains.length;
                            j++
                        ) {
                            let tempSubDomain = {
                                course: contentDomainList[i].course,
                                contentDomain: contentDomainList[i].title,
                                title: contentDomainList[i].subdomains[j],
                                id: contentDomainList[i].id + j,
                                selected: false,
                            };
                            subDomainList.push(tempSubDomain);
                        }
                    }
                }

                setLoadedContentDomains(contentDomainList);
                setFilteredContentDomains(contentDomainList);
                setLoadedSubdomains(subDomainList);
                setFilteredSubdomains(subDomainList);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProblems();
        fetchCourses();
        fetchContentDomains();
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
        filterContentDomainsByCourse(newList);
    };

    const selectContentDomain = (index) => {
        let newList = [...filteredContentDomains];
        newList[index].selected = !newList[index].selected;
        let noneSelected = true;
        newList.forEach((contentDomain) => {
            if (contentDomain.selected) {
                noneSelected = false;
            }
        });

        if (noneSelected) {
            let resetList = newList.map((contentDomain) => {
                return { ...contentDomain, selected: true };
            });
            filterProblemsByContentDomain(resetList);
        } else {
            filterProblemsByContentDomain(newList);
        }

        setFilteredContentDomains(newList);
    };

    const selectSubdomain = (index) => {
        let newSubdomainList = [...filteredSubdomains];
        newSubdomainList[index].selected = !newSubdomainList[index].selected;

        let noneSelected = true;
        newSubdomainList.forEach((subdomain) => {
            if (subdomain.selected) {
                noneSelected = false;
            }
        });

        if (noneSelected) {
            let resetList = newSubdomainList.map((subdomain) => {
                return { ...subdomain, selected: true };
            });
            filterProblemsBySubdomain(resetList);
        } else {
            filterProblemsBySubdomain(newSubdomainList);
        }
    }

    const selectAllCourses = () => {
        let newList = filteredCourses.map((course) => {
            return { ...course, selected: true };
        });
        setFilteredCourses(newList);
        filterProblemsByCourse(newList);
        filterContentDomainsByCourse(newList);
    };

    const selectNoCourses = () => {
        let newList = filteredCourses.map((course) => {
            return { ...course, selected: false };
        });
        setFilteredCourses(newList);
        filterProblemsByCourse(newList);
        filterContentDomainsByCourse(newList);
    };

    const filterProblemsByCourse = (courses) => {
        let filterCourseTitles = courses.filter((course) => course.selected);
        filterCourseTitles = filterCourseTitles.map((course) => course.title);

        let newProblemList = loadedProblems.filter((problem) =>
            filterCourseTitles.includes(problem.course)
        );

        setFilteredProblems(newProblemList);
    };

    const filterProblemsByContentDomain = (contentDomains) => {
        let filterContentDomainTitles = contentDomains.filter(
            (contentDomain) => contentDomain.selected
        );
        filterContentDomainTitles = filterContentDomainTitles.map(
            (contentDomain) => contentDomain.title
        );

        let newProblemList = loadedProblems.filter((problem) =>
            filterContentDomainTitles.includes(problem.subjectContent)
        );

        setFilteredProblems(newProblemList);
    };

    const filterProblemsBySubdomain = (subdomain) => {
        
    }

    const filterContentDomainsByCourse = (courses) => {
        let filterCourseTitles = courses.filter((course) => course.selected);
        filterCourseTitles = filterCourseTitles.map((course) => course.title);

        let newContentDomainList = loadedContentDomains.filter(
            (contentDomain) => filterCourseTitles.includes(contentDomain.course)
        );

        setFilteredContentDomains(newContentDomainList);
    };

    return (
        <div className="all-problems__container">
            <ErrorModal error={error} onClear={clearError} />
            <div className="container__title">
                <h1>View all problems</h1>
                <p>
                    Select all the courses, or any single course you want.{" "}
                    <br /> (Just make sure you do select a course!)
                </p>
            </div>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedProblems.length > 0 && (
                <>
                    <div className="filter__container">
                        <Dropdown
                            headerTitle="Select a course"
                            list={filteredCourses}
                            selectItem={selectCourse}
                            selectAll={selectAllCourses}
                            deselectAll={selectNoCourses}
                            selectAllOptions
                        />
                        <Dropdown
                            headerTitle="Select a content domain"
                            list={filteredContentDomains}
                            selectItem={selectContentDomain}
                        />

                        <Dropdown
                            headerTitle="Select a subdomain."
                            list={filteredSubdomains}
                            selectItem={selectContentDomain}
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
