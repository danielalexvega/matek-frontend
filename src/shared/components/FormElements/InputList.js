import React, { useReducer, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { validate } from "../../util/validators";
import "./InputList.css";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

const InputList = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || props.initialValue || "",
        isTouched: false,
        isValid: props.valid || props.initialValid || false,
    });

    const { id, onInput, options } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = (event) => {
        let target = event.target.value;

        if (id === "course" || id === "subjectContent") {
            let isTarget = false;
            for (let i = 0; i < options.length; i++) {
                if (target === options[i].title) {
                    isTarget = true;
                }
            }

            if (isTarget || target === "") {
                props.updateSelection(target);
            }
        }

        dispatch({
            type: "CHANGE",
            val: target,
            validators: props.validators,
        });
    };

    const touchHandler = () => {
        dispatch({ type: "TOUCH" });
    };

    return (
        <div
            className={`form-control ${
                !inputState.isValid &&
                inputState.isTouched &&
                "form-control--invalid"
            }`}
        >
            <div className="label-container">
                <label htmlFor={props.id}>{props.label}</label>
                {props.tooltip && (
                    <>
                        <span data-tip data-for={props.tooltipId}>
                            <FontAwesomeIcon
                                className="tooltip-icon"
                                icon={faCircleInfo}
                            />
                        </span>
                        <ReactTooltip
                            id={props.tooltipId}
                            type="info"
                            effects="solid"
                            delayShow={100}
                        >
                            <span className="tooltip-text">{props.tooltipText}</span>
                        </ReactTooltip>
                    </>
                )}
            </div>
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                list={props.listTitle}
                autoComplete="off"
            />
            <datalist id={props.listTitle}>
                {options.map((option) => (
                    <option value={option.title} key={option.id} />
                ))}
            </datalist>
            {!inputState.isValid && inputState.isTouched && (
                <p className="errorText">{props.errorText}</p>
            )}
        </div>
    );
};

export default InputList;
