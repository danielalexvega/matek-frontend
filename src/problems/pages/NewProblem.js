import React, { useCallback, useReducer } from "react";
import { Tex } from "react-tex";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Select from "../../shared/components/FormElements/Select";
import InputList from "../../shared/components/FormElements/InputList";
// Add validators here
import { VALIDATOR_REQUIRE, VALIDATOR_MATCH } from "../../shared/util/validators";
import "./NewProblem.css";

const options = [
  { id: 1, value: "exponent-rules", title: "Exponent Rules" },
  { id: 2, value: "fractional-exponents", title: "Fractional Exponents" },
  { id: 3, value: "simplify-radicals", title: "Simplify Radicals" },
  { id: 4, value: "radicals-and-fractional-exponents", title: "Radicals and Fractional Exponents" },
  { id: 5, value: "imaginary-complex-numbers", title: "Imaginary/Complex Numbers" },
  { id: 6, value: "factoring", title: "Radicals and Fractional Exponents" },
  { id: 7, value: "advanced-factoring", title: "Radicals and Fractional Exponents" },
  { id: 8, value: "quadratic-formula", title: "Radicals and Fractional Exponents" },
  { id: 9, value: "complete-the-square", title: "Radicals and Fractional Exponents" },
  { id: 10, value: "nature-of-the-roots", title: "Radicals and Fractional Exponents" },
  { id: 11, value: "sum-product-of-the-roots", title: "Sum/Product of the Roots" },
  { id: 12, value: "systems-of-equations", title: "System of Equations" },
  { id: 13, value: "parabolas-equations-from-directrix-and-focus", title: "Parabolos Equations from Directrix and Focus" },
  { id: 14, value: "polynomial-operations", title: "Polynomial Operations" },
  { id: 15, value: "polynomial-division", title: "Polynomial Division" },
  { id: 16, value: "polynomial-graphs", title: "Polynomial Graphs" },
  { id: 17, value: "polynomial-key-features", title: "Polynomial Key Features" },
];

const optionsTitles = options.map(option => option.title);

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
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

    default:
      return state;
  }
};

const NewProblem = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      katex: {
        value: " ",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  return (
    <div className="new-problem-container">
      <h1 className="new-problem__title">Add a new problem to your desk.</h1>
      <p className="new-problem__description">
        If you need help with KaTeX syntax, you can check out the{" "}
        <a
          href="https://katex.org/"
          target="_blank"
          rel="noreferrer"
          className="description__link"
        >
          documentation.
        </a>
      </p>
      <form className="problem-form">
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
        <Input
          element="textarea"
          id="katex"
          label="Katex"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid problem"
          onInput={InputHandler}
        />
        <div className="problem-form__katex-display-container">
          <p className="katex-display-container__title">KaTex Preview</p>
          <Tex
            className="katex-display-container__katex"
            texContent={formState.inputs.katex.value}
          />
        </div>

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
