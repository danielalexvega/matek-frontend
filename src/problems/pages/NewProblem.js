import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Tex, InlineTex } from "react-tex";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import InputList from "../../shared/components/FormElements/InputList";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import InputChoices from "../components/InputChoices";
// import KatexPreview from "../components/KatexPreview";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// import ReactTooltip from "react-tooltip";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

// Add validators here
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MATCH,
} from "../../shared/util/validators";
import "./ProblemForm.css";

const NewProblem = () => {
    const [courses, setCourses] = useState([]);
    const [courseTitles, setCourseTitles] = useState([]);
    const [contentDomains, setContentDomains] = useState([]);
    const [filteredContentDomains, setFilteredContentDomains] = useState([]);
    const [domainTitles, setDomainTitles] = useState([]);
    const [subdomains, setSubdomains] = useState([]);
    const [filteredSubdomains, setFilteredSubdomains] = useState([]);
    const [subdomainTitles, setSubdomainTitles] = useState([]);

    const { userId, userName, token } = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();

    const [
        formState,
        inputHandler,
        setFormData,
        addChoiceHandler,
        removeChoiceHandler,
        multipleChoiceHandler,
        imageSelectionHandler,
    ] = useForm(
        {
            course: {
                value: "",
                isValid: false,
            },
            subjectContent: {
                value: "",
                isValid: false,
            },
            subdomain: {
                value: "",
                isValid: false,
            },
            katexText: {
                value: "",
                isValid: false,
            },
            katex: {
                value: "",
                isValid: true,
            },
            solution: {
                value: "",
                isValid: false,
            },
            isMultipleChoice: { value: false, isValid: true },
            choices: {
                value: [],
                isValid: true,
            },
            description: {
                value: "",
                isValid: true,
            },
            hasImage: { value: false, isValid: true },
            image: {
                value: null,
                isValid: true,
            },
        },
        false
    );

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/courses/"
                );
                const courseList = responseData.courses.map((course) => {
                    return { title: course.courseTitle, id: course.id };
                });

                const courseTitleList = courseList.map(
                    (course) => course.title
                );
                setCourses(courseList);
                setCourseTitles(courseTitleList);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCourses();
    }, [sendRequest]);

    useEffect(() => {
        const fetchContentDomains = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/contentDomains/"
                );
                // Get Content Domain List
                const contentDomainList = responseData.contentDomains.map(
                    (domain) => {
                        return {
                            title: domain.domainTitle,
                            id: domain.id,
                            course: domain.courses[0].value,
                            subdomains: domain.subdomains,
                        };
                    }
                );

                // Create Domain Title List for Validation
                const domainTitleList = contentDomainList.map(
                    (domain) => domain.title
                );
                // Get Subdomain List from Content Domain List
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
                            };
                            subDomainList.push(tempSubDomain);
                        }
                    }
                }

                const subdomainTitleList = subDomainList.map(
                    (subdomain) => subdomain.title
                );

                // List of all Content Domains
                setContentDomains(contentDomainList);
                setFilteredContentDomains(contentDomainList);
                setDomainTitles(domainTitleList);
                // List of all Content Domains and Subdomains
                setSubdomains(subDomainList);
                setFilteredSubdomains(subDomainList);
                setSubdomainTitles(subdomainTitleList);
            } catch (err) {
                console.log(err);
            }
        };

        fetchContentDomains();
    }, [sendRequest]);

    // filter the content domains and subdomains based on the course
    const updateCourseDomains = (course) => {
        if (course === "") {
            setFilteredContentDomains(contentDomains);
            setFilteredSubdomains(subdomains);
        }
        // filter the content domains
        if (courseTitles.includes(course)) {
            let filteredDomainList = contentDomains.filter(
                (domain) => domain.course === course
            );
            setFilteredContentDomains(filteredDomainList);
            // filter the subdomains
            let filteredSubdomainList = subdomains.filter(
                (subdomain) => subdomain.course === course
            );
            setFilteredSubdomains(filteredSubdomainList);
        }
    };

    const updateCourseSubdomains = (domain) => {
        if (domain === "") {
            setFilteredSubdomains(subdomains);
        }

        if (domainTitles.includes(domain)) {
            let filteredSubDomainList = subdomains.filter(
                (subdomain) => subdomain.contentDomain === domain
            );
            setFilteredSubdomains(filteredSubDomainList);
        }
    };

    const problemSubmitHandler = async (event) => {
        event.preventDefault();
        if (!formState.inputs.hasImage.value) {
            try {
                await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/problems",
                    "POST",
                    JSON.stringify({
                        course: formState.inputs.course.value,
                        subjectContent: formState.inputs.subjectContent.value,
                        subdomain: formState.inputs.subdomain.value,
                        katexText: formState.inputs.katexText.value,
                        katex: formState.inputs.katex.value,
                        solution: formState.inputs.solution.value,
                        isMultipleChoice:
                            formState.inputs.isMultipleChoice.value,
                        choices: formState.inputs.choices.value,
                        description: formState.inputs.description.value,
                        author: userName,
                        hasImage: formState.inputs.hasImage.value,
                    }),
                    {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    }
                );
                history.push(`/${userId}/problems`);
            } catch (error) {
                //redirect user to a different page
            }
        } else {
            try {
                const formData = new FormData();
                formData.append(
                    "subjectContent",
                    formState.inputs.subjectContent.value
                );
                formData.append("katexText", formState.inputs.katexText.value);
                formData.append("katex", formState.inputs.katex.value);
                formData.append("solution", formState.inputs.solution.value);
                formData.append(
                    "isMultipleChoice",
                    formState.inputs.isMultipleChoice.value
                );
                formData.append("choices", formState.inputs.choices.value);
                formData.append(
                    "description",
                    formState.inputs.description.value
                );
                formData.append("author", userName);
                formData.append("courses", formState.inputs.course.value);
                formData.append("hasImage", formState.inputs.hasImage.value);
                formData.append("image", formState.inputs.image.value);

                await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/problems",
                    "POST",
                    formData,
                    { Authorization: "Bearer " + token }
                );
                history.push(`/${userId}/problems`);
            } catch (error) {}
        }
    };

    return (
        <div className="problem-container">
            <h1 className="problem-container__title">
                Add a new problem to your desk.
            </h1>
            <p className="problem-container__description">
                If you need help with <Tex texContent="\KaTeX" /> syntax, you
                can check out the{" "}
                <a
                    href="https://katex.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="description__link"
                >
                    documentation.
                </a>
            </p>
            <ErrorModal error={error} onClear={clearError} />
            <form className="problem-form" onSubmit={problemSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                {!isLoading && courses !== [] && (
                    <div className="problem-form__container">
                        <div className="container__columns">
                            <div className="columns__right">
                                <InputList
                                    id="course"
                                    selectName="course"
                                    label="Please select a course."
                                    options={courses}
                                    validators={[VALIDATOR_MATCH(courseTitles)]}
                                    errorText="Please select a valid course."
                                    onInput={inputHandler}
                                    type="text"
                                    placeholder="Algebra 1"
                                    listTitle="courseList"
                                    updateSelection={updateCourseDomains}
                                    tooltip
                                    tooltipId="courseHelp"
                                    tooltipText="You can use the drop down menu, or you can type a course. It must be one of the approved courses; you can't just go making up courses."
                                />
                                <InputList
                                    id="subjectContent"
                                    selectName="subjectContent"
                                    label="Please select a subject content."
                                    options={filteredContentDomains}
                                    validators={[VALIDATOR_MATCH(domainTitles)]}
                                    errorText="Please enter a valid content section."
                                    onInput={inputHandler}
                                    type="text"
                                    placeholder="Content Domains"
                                    listTitle="contentList"
                                    updateSelection={updateCourseSubdomains}
                                    tooltip
                                    tooltipId="subjectContentHelp"
                                    tooltipText="Use the drop down menu to select the appropriate subject content."
                                />
                                <InputList
                                    id="subdomain"
                                    selectName="subdomain"
                                    label="Please select a content subdomain."
                                    options={filteredSubdomains}
                                    validators={[
                                        VALIDATOR_MATCH(subdomainTitles),
                                    ]}
                                    errorText="Please enter a valid subdomain for the selected content."
                                    onInput={inputHandler}
                                    type="text"
                                    placeholder="Content Subdomain"
                                    listTitle="subdomainList"
                                    tooltip
                                    tooltipId="subdomainHelp"
                                    tooltipText="Use the drop down menu to select the appropriate subdomain."
                                />
                                {/* Problem  */}
                                <Input
                                    element="textarea"
                                    id="katexText"
                                    label="Problem Text - Written in Katex"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="Please enter a valid problem"
                                    onInput={inputHandler}
                                    tooltip
                                    tooltipId="problemHelp"
                                    tooltipText="This is where you write the problem text and any expressions that belong in the text."
                                    placeholder="Write your problem here."
                                />
                                {/* Problem  */}
                                <Input
                                    element="textarea"
                                    id="katex"
                                    label="Equation - Written in Katex"
                                    sublabel="Only if needed"
                                    validators={[]}
                                    onInput={inputHandler}
                                    tooltip
                                    tooltipId="equationHelp"
                                    tooltipText="If you need to have a seperate expression, you can write that here. It's not required."
                                    initialValid={true}
                                />
                                <Input
                                    element="input"
                                    type="text"
                                    id="solution"
                                    label="Solution - Written in Katex"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="Please enter a valid solution"
                                    onInput={inputHandler}
                                />
                                <div>
                                    <label
                                        htmlFor="multipleChoiceSelection"
                                        className="multipleChoiceSelection"
                                    >
                                        Is this a multiple choice question?
                                    <input
                                        type="checkbox"
                                        id="multipleChoiceSelection"
                                        name="multipleChoiceSelection"
                                        onClick={() => multipleChoiceHandler()}
                                    />
                                    </label>
                                </div>
                                {formState.inputs.isMultipleChoice.value && (
                                    <InputChoices
                                        choicesArray={
                                            formState.inputs.choices.value
                                        }
                                        inputHandler={inputHandler}
                                        addChoiceHandler={addChoiceHandler}
                                        removeChoiceHandler={
                                            removeChoiceHandler
                                        }
                                    />
                                )}
                                {/* Description  */}
                                <Input
                                    element="textarea"
                                    id="description"
                                    label="Description"
                                    validators={[]}
                                    onInput={inputHandler}
                                    initialValid={true}
                                />
                                <label
                                    htmlFor="imageSelection"
                                    className="imageSelection"
                                >
                                    Does this problem have an image associated
                                    with it?
                                    <input
                                        type="checkbox"
                                        id="imageSelection"
                                        nanme="imageSelection"
                                        onClick={imageSelectionHandler}
                                        // onClick={()=>{console.log("FUCK OFF")}}
                                    />
                                </label>
                                {/* {formState.inputs.hasImage.value && (
                                    <ImageUpload
                                        id="image"
                                        center
                                        onInput={inputHandler}
                                    />
                                )} */}
                            </div>

                            <div className="columns__left">
                                <p>Problem Preview</p>
                                <Card className="problem-item__content">
                                    {isLoading && <LoadingSpinner asOverlay />}
                                    {formState.inputs.hasImage.value && (
                                        <div className="problem-item__image">
                                            {formState.inputs.hasImage
                                                .value && (
                                                <img
                                                    src={
                                                        formState.inputs.image
                                                            .value
                                                    }
                                                    alt="problem"
                                                />
                                            )}
                                        </div>
                                    )}
                                    <div className="problem-item__problem">
                                        <div className="problem__course">
                                            <span className="course__title">
                                                {formState.inputs.course
                                                    .value === ""
                                                    ? "Algebra 1"
                                                    : formState.inputs.course
                                                          .value}
                                            </span>{" "}
                                            |{" "}
                                            {formState.inputs.subjectContent
                                                .value === ""
                                                ? "Solving One Variable Equations"
                                                : formState.inputs
                                                      .subjectContent.value}
                                        </div>
                                        <div className="problem__subdomain">
                                            {formState.inputs.subdomain
                                                .value === ""
                                                ? "Two Step Equations"
                                                : formState.inputs.subdomain
                                                      .value}
                                        </div>
                                        <div className="problem__katex-container">
                                            <p className="problem__katex">
                                                <InlineTex
                                                    texContent={
                                                        formState.inputs
                                                            .katexText.value ===
                                                        ""
                                                            ? "Solve for $$b$$."
                                                            : formState.inputs
                                                                  .katexText
                                                                  .value
                                                    }
                                                />
                                            </p>
                                            <p className="problem__katex center">
                                                <InlineTex
                                                    texContent={
                                                        formState.inputs
                                                            .katexText.value ===
                                                        ""
                                                            ? "$$-32+10b=-22$$"
                                                            : formState.inputs
                                                                  .katex.value
                                                    }
                                                />
                                            </p>
                                        </div>
                                    </div>
                                    {/* <ul className="problem-item__choices">
                        {choices.map((choice, index) => (
                            <li key={index}>
                                <InlineTex texContent={choice.value} />
                            </li>
                        ))}
                    </ul> */}
                                    <div className="problem-item__solution">
                                        <InlineTex
                                            texContent={
                                                formState.inputs.solution.value
                                            }
                                        />
                                    </div>
                                    <div className="problem-item__info">
                                        <p className="info__author">
                                            Written by {userName}
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        <div className="container__submitbutton">
                            <Button type="submit" disabled={!formState.isValid}>
                                Add Problem
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default NewProblem;
