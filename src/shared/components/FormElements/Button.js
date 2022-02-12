import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
    if (props.href) {
        return (
            <a
                className={`button button--${props.size || "default"} ${
                    props.primary && "button--primary"
                } ${props.danger && "button--danger"}`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`button button--${props.size || "default"} ${
                    (props.primary && "button--primary") || ""
                } ${(props.danger && "button--danger") || ""} ${
                    (props.warning && "button--warning") || ""
                }`}
            >
                {props.children}
            </Link>
        );
    }
    return (
        <button
        className={`button button--${props.size || "default"} ${
            (props.primary && "button--primary") || ""
        } ${(props.danger && "button--danger") || ""} ${
            (props.warning && "button--warning") || ""
        } ${props.className}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
            key={props.id}
        >
            {props.children}
        </button>
    );
};

export default Button;
