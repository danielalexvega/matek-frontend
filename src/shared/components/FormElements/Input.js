import React, { useReducer, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { validate } from "../../util/validators";
import "./Input.css";

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

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || "",
        isTouched: false,
        isValid: props.initialValid || false,
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = (event) => {
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = () => {
        dispatch({ type: "TOUCH" });
    };

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.row || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                placeholder={props.placeholder}
            />
        );

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
                            <span className="tooltip-text">
                                {props.tooltipText}
                            </span>
                        </ReactTooltip>
                    </>
                )}
            </div>
            {props.sublabel && <div className="sublevel">{props.sublabel}</div>}
            <div className="password__container">
                {element}
                {props.togglePassword && (
                    <a
                        className="togglePassword"
                        onClick={props.togglePassword}
                    >
                        {props.passwordShown && (
                            <>
                                <span data-tip data-for="hide-password">
                                    <FontAwesomeIcon
                                        className="password-icon"
                                        icon={faEyeSlash}
                                    />
                                </span>
                                <ReactTooltip
                                    id="hide-password"
                                    type="info"
                                    effects="solid"
                                    delayShow={100}
                                >
                                    <span className="tooltip-text">
                                        Hide Password
                                    </span>
                                </ReactTooltip>
                            </>
                        )}
                        {!props.passwordShown && (
                            <>
                            <span data-tip data-for="show-password">
                                <FontAwesomeIcon
                                    className="password-icon"
                                    icon={faEye}
                                />
                            </span>
                            <ReactTooltip
                                id="show-password"
                                type="info"
                                effects="solid"
                                delayShow={100}
                            >
                                <span className="tooltip-text">
                                    Show Password
                                </span>
                            </ReactTooltip>
                        </>
                        )}
                    </a>
                )}
            </div>
            {!inputState.isValid && inputState.isTouched && (
                <p className="errorText">{props.errorText}</p>
            )}
        </div>
    );
};

export default Input;
