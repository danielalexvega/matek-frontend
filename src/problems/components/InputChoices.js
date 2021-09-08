import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import "./InputChoices.css";

//props = choicesArray, inputHandler, addChoiceHandler, removeChoiceHandler
const InputChoices = ({
  choicesArray,
  inputHandler,
  addChoiceHandler,
  removeChoiceHandler,
  value,
  valid
}) => {
  
  return (
    <React.Fragment>
      <div className="input-choices__title-container">
        <p>Add or Remove choices for multiple choice problems.</p>
        <div className="button-container">
        <Button onClick={addChoiceHandler} size="round">+</Button>
          <Button size="round" danger onClick={removeChoiceHandler}>
            -
          </Button>
        </div>
      </div>
      <div className="input-choices__choices-container">
        <div className="choices-container__left-container">
          {choicesArray.map((choice) => (
            <Input
              key={choice.label}
              element="input"
              type="text"
              id={choice.id}
              label={choice.label}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid problem"
              onInput={inputHandler}
              value={value}
              valid={valid}
            />
          ))}
      </div>
      </div>
    </React.Fragment>
  );
};

export default InputChoices;
