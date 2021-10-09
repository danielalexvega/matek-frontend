import React, { useContext } from "react";
import { Tex } from "react-tex";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
// import Select from "../../shared/components/FormElements/Select";
import InputList from "../../shared/components/FormElements/InputList";
import InputChoices from "../components/InputChoices";
import KatexPreview from "../components/KatexPreview";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
// Add validators here
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MATCH,
} from "../../shared/util/validators";
import "./ProblemForm.css";

import content_subjects from "../../shared/content_subjects";

const optionsTitles = content_subjects.map((option) => option.title);

const NewProblem = () => {
  const { userId, userName } = useContext(AuthContext);
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
      isMultipleChoice: { value: false, isValid: true },
      choices: {
        value: [],
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const problemSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/problems",
        "POST",
        JSON.stringify({
          subjectContent: formState.inputs.subjectContent.value,
          katex: formState.inputs.katex.value,
          solution: formState.inputs.solution.value,
          isMultipleChoice: formState.inputs.isMultipleChoice.value,
          choices: formState.inputs.choices.value,
          description: formState.inputs.description.value,
          author: userName,
          authorId: userId,
          courses: [{value: "Algebra 2"}],
        }),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      //redirect user to a different page
    }
  };

  return (
    <div className="problem-container">
      <h1 className="problem-container__title">
        Add a new problem to your desk.
      </h1>
      <p className="problem-container__description">
        If you need help with <Tex texContent="\KaTeX" /> syntax, you can check
        out the{" "}
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
        {/* Subject Content  */}
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
        />
        {/* Problem  */}
        <Input
          element="textarea"
          id="katex"
          label="Problem - Written in Katex"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid problem"
          onInput={inputHandler}
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
            onClick={multipleChoiceHandler}
          />
        </label>

        {/* Input Choices  */}
        {/* map over the choices array, for each value, add an input */}
        {formState.inputs.isMultipleChoice.value && (
          <InputChoices
            choicesArray={formState.inputs.choices.value}
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
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Problem
        </Button>
      </form>
    </div>
  );
};

export default NewProblem;
