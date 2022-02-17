import React from "react";
import { InlineTex } from "react-tex";

import "./KatexExample.css";

// FIX THIS LATER
// props.children is the header of this component

const KatexExample = ({
    children,
    body,
    expressionHeader,
    expression,
    className,
    expressionClassName,
}) => {
    return (
        <div
            className={`katex-example-container ${className ? className : ""}`}
        >
            <div className="katex-example">
                {children && (
                    <div className="katex-example__title-container">
                        <h3 className="title-container__title">{children}</h3>
                    </div>
                )}
                <div className="katex-example__display-expression">
                    <p>{body}</p>
                    <p className="display-expression">{expression}</p>
                </div>
                <div
                    className={`katex-example__display-katex ${
                        expressionClassName ? expressionClassName : ""
                    }`}
                >
                    <p>{expressionHeader}</p>
                    <div className="display-katex__inlineTex">
                        <InlineTex style={{}} texContent={expression} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KatexExample;
