import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

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
                <p className="title-container__title">
                    Add or Remove choices for multiple choice problems.
                </p>
                <div className="button-container">
                    <Button
                        onClick={addChoiceHandler}
                        size="round"
                        primary
                        className="plus"
                    >
                        <FontAwesomeIcon
                            className="tooltip-icon"
                            icon={faPlus}
                        />
                    </Button>
                    <Button size="round" danger onClick={removeChoiceHandler}>
                        <FontAwesomeIcon
                            className="tooltip-icon"
                            icon={faMinus}
                        />
                    </Button>
                </div>
            </div>
            <div className="input-choices__choices-container">
                <div className="choices-container">
                    <div className="multiple-choice__titles">
                        <span>Choices in Katex</span>
                        <span>Choice Preview</span>
                    </div>
                    {choicesArray.map((choice, index) => (
                        <div className="multiple-choice__container" key={index}>
                            <Input
                                key={choice.label}
                                element="input"
                                type="text"
                                id={choice.id}
                                label={choice.label}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter a valid choice"
                                onInput={inputHandler}
                                initialValue={choice.value}
                                initialValid={choice.isValid}
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
