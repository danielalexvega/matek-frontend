import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Tex } from "react-tex";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
// import Select from "../../shared/components/FormElements/Select";
import InputList from "../../shared/components/FormElements/InputList";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
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
    imageSelectionHandler,
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
      hasImage: { value: false, isValid: true },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const problemSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formState.inputs.hasImage.value) {
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
            courses: [{ value: "Algebra 2" }],
            hasImage: formState.inputs.hasImage.value,
          }),
          { "Content-Type": "application/json" }
        );
        history.push(`/${userId}/problems`);
      } catch (error) {
        //redirect user to a different page
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("subjectContent", formState.inputs.subjectContent.value);
        formData.append("katex", formState.inputs.katex.value);
        formData.append("solution", formState.inputs.solution.value);
        formData.append("isMultipleChoice", formState.inputs.isMultipleChoice.value);
        formData.append("choices", formState.inputs.choices.value);
        formData.append("description", formState.inputs.description.value);
        formData.append("author", userName);
        formData.append("authorId", userId);
        formData.append("courses", [{ value: "Algebra 2" }]);
        formData.append("hasImage", formState.inputs.hasImage.value);
        formData.append("image", formState.inputs.image.value);

        await sendRequest(
          "http://localhost:5000/api/problems",
          "POST",
          formData
        );
        history.push(`/${userId}/problems`);
      } catch (error) {
        
      }
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
        <label htmlFor="imageSelection" className="imageSelection">
          Does this problem have an image associated with it?
          <input
            type="checkbox"
            id="imageSelection"
            onClick={imageSelectionHandler}
          />
        </label>
        {formState.inputs.hasImage.value && (
          <ImageUpload id="image" center onInput={inputHandler} />
        )}
        <Button type="submit" disabled={!formState.isValid}>
          Add Problem
        </Button>
      </form>
    </div>
  );
};

export default NewProblem;
