import React, { useCallback, useReducer, useEffect } from "react";
import { Tex } from "react-tex";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
// import Select from "../../shared/components/FormElements/Select";
import InputList from "../../shared/components/FormElements/InputList";
import InputChoices from "../components/InputChoices";
import KatexPreview from "../components/KatexPreview";
// Add validators here
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MATCH,
} from "../../shared/util/validators";
import "./NewProblem.css";

const options = [
  { id: 1, value: "exponent-rules", title: "Exponent Rules" },
  { id: 2, value: "fractional-exponents", title: "Fractional Exponents" },
  { id: 3, value: "simplify-radicals", title: "Simplify Radicals" },
  {
    id: 4,
    value: "radicals-and-fractional-exponents",
    title: "Radicals and Fractional Exponents",
  },
  {
    id: 5,
    value: "imaginary-complex-numbers",
    title: "Imaginary/Complex Numbers",
  },
  { id: 6, value: "factoring", title: "Radicals and Fractional Exponents" },
  {
    id: 7,
    value: "advanced-factoring",
    title: "Radicals and Fractional Exponents",
  },
  {
    id: 8,
    value: "quadratic-formula",
    title: "Radicals and Fractional Exponents",
  },
  {
    id: 9,
    value: "complete-the-square",
    title: "Radicals and Fractional Exponents",
  },
  {
    id: 10,
    value: "nature-of-the-roots",
    title: "Radicals and Fractional Exponents",
  },
  {
    id: 11,
    value: "sum-product-of-the-roots",
    title: "Sum/Product of the Roots",
  },
  { id: 12, value: "systems-of-equations", title: "System of Equations" },
  {
    id: 13,
    value: "parabolas-equations-from-directrix-and-focus",
    title: "Parabolos Equations from Directrix and Focus",
  },
  { id: 14, value: "polynomial-operations", title: "Polynomial Operations" },
  { id: 15, value: "polynomial-division", title: "Polynomial Division" },
  { id: 16, value: "polynomial-graphs", title: "Polynomial Graphs" },
  {
    id: 17,
    value: "polynomial-key-features",
    title: "Polynomial Key Features",
  },
];

const choiceLetterArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
];

const optionsTitles = options.map((option) => option.title);

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId !== "choices" && inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else if (inputId === "choices" && state.inputs.isMultipleChoice.value && action.inputId.includes("choice")){
          formIsValid = formIsValid && action.isValid;
        }else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };

    case "ADD_CHOICE":
      let choiceIndex = state.inputs.choices.value.length;
      let newChoice = {
        id: `choice${choiceLetterArray[choiceIndex]}`,
        label: choiceLetterArray[choiceIndex],
        value: "",
        isValid: false,
      };

      return {
        ...state,
        inputs: {
          ...state.inputs,
          choices: {
            value: [...state.inputs.choices.value, newChoice],
          },
        },
      };

    case "REMOVE_CHOICE":
      let updatedChoices = [...state.inputs.choices.value];
      updatedChoices.pop();

      return {
        ...state,
        inputs: {
          ...state.inputs,
          subjectContent: {
            ...state.inputs.subjectContent
          },
          katex: {
            ...state.inputs.katex
          },
          solution: {
            ...state.inputs.solution
          },
          isMultipleChoice: { ...state.inputs.isMultipleChoice },
          choices: {
            value: [...updatedChoices],
          },
          description: {
            ...state.inputs.description
          }
        },
      };

    case "SELECT_MULTIPLE_CHOICE":
      let updatedChoice = !state.inputs.isMultipleChoice.value;
      return {
        ...state,
        inputs: {
          ...state.inputs,
          isMultipleChoice: {
            value: updatedChoice,
            isValid: true
          },
        },
      };

    default:
      return state;
  }
};

const NewProblem = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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
      isMultipleChoice: { value: null, isValid: true },
      choices: {
        value: [
          // { id: "choiceA", label: "A", value: "", isValid: false },
          // { id: "choiceB", label: "B", value: "", isValid: false },
        ],
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    isValid: false,
  });

  useEffect(()=> {}, [formState.inputs.choices.value]);

  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const addChoiceHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_CHOICE",
    });
  };

  const removeChoiceHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: "REMOVE_CHOICE",
    });
  };

  const multipleChoiceHandler = () => {
    dispatch({
      type: "SELECT_MULTIPLE_CHOICE",
    });
  };

  const problemSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs) //send to backend

  }

  return (
    <div className="new-problem-container">
      <h1 className="new-problem__title">Add a new problem to your desk.</h1>
      <p className="new-problem__description">
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
      <form className="problem-form" onSubmit={problemSubmitHandler}>
        {/* Subject Content  */}
        <InputList
          id="subjectContent"
          selectName="subjectContent"
          label="Please select a subject content."
          options={options}
          validators={[VALIDATOR_MATCH(optionsTitles)]}
          errorText="Please enter a valid content section"
          onInput={InputHandler}
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
          onInput={InputHandler}
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
          onInput={InputHandler}
        />
        <KatexPreview
          title="Katex Preview for Solution"
          texContent={formState.inputs.solution.value}
        />
        <label htmlFor="multipleChoiceSelection" className="multipleChoiceSelection">
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
            inputHandler={InputHandler}
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
          onInput={InputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Problem
        </Button>
      </form>
    </div>
  );
};

export default NewProblem;
