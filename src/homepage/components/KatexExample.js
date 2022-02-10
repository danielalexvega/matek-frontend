import React from "react";
import { InlineTex } from "react-tex";

import "./KatexExample.css";

// FIX THIS LATER 
// props.children is the header of this component 

const KatexExample = ({children, body, expressionHeader, expression, }) => {
  return (
    <div className="katex-example-container">
      <div className="katex-example">
        <h3 className="katex-example__title">{children}</h3>
      </div>
      <div className="katex-example__display-expression">
        <p>{body}</p>
        <p className="display-expression">{expression}</p>
      </div>
      <div className="katex-example__display-katex">
        <p>{expressionHeader}</p>
        <div className="display-katex__inlineTex"><InlineTex style={{}}texContent={expression} /></div>
      </div>
    </div>
  );
};

export default KatexExample;
