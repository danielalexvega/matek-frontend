import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import "./InputChoices.css";
import KatexPreview from "./KatexPreview";

//props = choicesArray, inputHandler, addChoiceHandler, removeChoiceHandler
const InputChoices = ({
  choicesArray,
  inputHandler,
  addChoiceHandler,
  removeChoiceHandler,
  value,
  valid,
}) => {
  return (
    <React.Fragment>
      <div className="input-choices__title-container">
        <p>Add or Remove choices for multiple choice problems.</p>
        <div className="button-container">
          <Button onClick={addChoiceHandler} size="round">
            +
          </Button>
          <Button size="round" danger onClick={removeChoiceHandler}>
            -
          </Button>
        </div>
      </div>
      <div className="input-choices__choices-container">
        <div className="choices-container">
          {choicesArray.map((choice) => (
            <div className="multiple-choice__container">
              <Input
                key={choice.label}
                element="input"
                type="text"
                id={choice.id}
                label={choice.label}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid problem"
                onInput={inputHandler}
                value={choice.value}
                valid={choice.isValid}
              />
              <KatexPreview texContent={choice.value} />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default InputChoices;
