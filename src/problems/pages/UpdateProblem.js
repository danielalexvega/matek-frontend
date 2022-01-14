import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";
import { Tex } from "react-tex";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import InputList from "../../shared/components/FormElements/InputList";
import Card from "../../shared/components/UIElements/Card";
import InputChoices from "../components/InputChoices";
import KatexPreview from "../components/KatexPreview";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MATCH,
} from "../../shared/util/validators";

import "./ProblemForm.css";

import content_subjects from "../../shared/content_subjects";

const optionsTitles = content_subjects.map((option) => option.title);

const UpdateProblem = () => {
    const auth = useContext(AuthContext);
    const problemId = useParams().problemId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedProblem, setLoadedProblem] = useState();

    const history = useHistory();

    const [
        formState,
        inputHandler,
        setFormData,
        addChoiceHandler,
        removeChoiceHandler,
        multipleChoiceHandler,
    ] = useForm(
        {
            subjectContent: {
                value: "",
                isValid: false,
            },
            katex: {
                value: "",
                isValid: false,
            },
            solution: {
                value: "",
                isValid: false,
            },
            isMultipleChoice: {
                value: "",
                isValid: false,
            },
            choices: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/problems/${problemId}`
                );
                setLoadedProblem(responseData.problem);
                setFormData(
                    {
                        subjectContent: {
                            value: responseData.problem.subjectContent,
                            isValid: true,
                        },
                        katex: {
                            value: responseData.problem.katex,
                            isValid: true,
                        },
                        solution: {
                            value: responseData.problem.solution,
                            isValid: true,
                        },
                        isMultipleChoice: {
                            value: responseData.problem.isMultipleChoice,
                            isValid: true,
                        },
                        choices: {
                            value: responseData.problem.choices,
                            isValid: true,
                        },
                        description: {
                            value: responseData.problem.description,
                            isValid: true,
                        },
                    },
                    true
                );
            } catch (error) {}
        };
        fetchProblem();
    }, [sendRequest, problemId, setFormData]);

    const problemUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        try {
            await sendRequest(
                `http://localhost:5000/api/problems/${problemId}`,
                "PATCH",
                JSON.stringify({
                    subjectContent: formState.inputs.subjectContent.value,
                    katex: formState.inputs.katex.value,
                    solution: formState.inputs.solution.value,
                    isMultipleChoice: formState.inputs.isMultipleChoice.value,
                    choices: formState.inputs.choices.value,
                    description: formState.inputs.description.value,
                    courses: [{ value: "Algebra 2" }],
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                }
            );
            history.push(`/${loadedProblem.authorId}/problems`);
        } catch (error) {}
    };

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!isLoading && !loadedProblem) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find a problem.</h2>
                </Card>
            </div>
        );
    }

    return (
        <div className="problem-container">
            <h1 className="problem-container__title">Update a problem.</h1>
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
            {!isLoading && loadedProblem && (
                <form
                    className="problem-form"
                    onSubmit={problemUpdateSubmitHandler}
                >
                    <InputList
                        id="subjectContent"
                        selectName="subjectContent"
                        label="Please select a subject content."
                        options={content_subjects}
                        validators={[VALIDATOR_MATCH(optionsTitles)]}
                        errorText="Please enter a valid content section"
                        onInput={inputHandler}
                        type="text"
                        placeholder="Exponent Rules"
                        listTitle="contentList"
                        initialValue={loadedProblem.subjectContent}
                        initialValid={true}
                    />
                    {/* Problem  */}
                    <Input
                        element="textarea"
                        id="katex"
                        label="Problem - Written in Katex"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid problem"
                        onInput={inputHandler}
                        initialValue={loadedProblem.katex}
                        initialValid={true}
                    />
                    <KatexPreview
                        title="KaTex Preview"
                        texContent={formState.inputs.katex.value}
                    />
                    {/* Solution  */}
                    <Input
                        element="input"
                        type="text"
                        id="solution"
                        label="Solution - Written in Katex"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid problem"
                        onInput={inputHandler}
                        initialValue={loadedProblem.solution}
                        initialValid={true}
                    />
                    <KatexPreview
                        title="Katex Preview for Solution"
                        texContent={formState.inputs.solution.value}
                    />
                    <label
                        htmlFor="multipleChoiceSelection"
                        className="multipleChoiceSelection"
                    >
                        Is this a multiple choice question?
                        <input
                            type="checkbox"
                            id="multipleChoiceSelection"
                            value={loadedProblem.isMultipleChoice}
                            onClick={multipleChoiceHandler}
                            checked={loadedProblem.isMultipleChoice}
                            onChange={multipleChoiceHandler}
                        />
                    </label>

                    {formState.inputs.isMultipleChoice.value && (
                        <InputChoices
                            choicesArray={loadedProblem.choices}
                            inputHandler={inputHandler}
                            addChoiceHandler={addChoiceHandler}
                            removeChoiceHandler={removeChoiceHandler}
                        />
                    )}

                    {/* Description  */}
                    <Input
                        element="textarea"
                        id="description"
                        label="Description"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid problem"
                        onInput={inputHandler}
                        initialValue={loadedProblem.description}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        Update Problem
                    </Button>
                </form>
            )}
        </div>
    );
};

export default UpdateProblem;
