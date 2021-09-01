import React, { useCallback, useReducer } from "react";
import { Tex } from "react-tex";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NewProblem.css";

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
        If you need help with KaTeX syntax, you can check out the <a href="https://katex.org/" target="_blank" rel="noreferrer" className="description__link">documentation.</a>
      </p>
      <form className="problem-form">
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
