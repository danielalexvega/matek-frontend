import React, { useCallback, useReducer } from "react";

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
        input: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid
      };

      default:
          return state;
  }
};

const NewProblem = () => {
  const [formState, dispatch ] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
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
      dispatch({type: "INPUT_CHANGE", value: value, isValid: isValid, inputId: id});
  }, []);

  return (
    <form className="problem-form">
      <Input
        element="input"
        id="title"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={InputHandler}
      />
      <Input
        element="textarea"
        id="description"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description"
        onInput={InputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>Add Problem</Button>
    </form>
  );
};

export default NewProblem;
