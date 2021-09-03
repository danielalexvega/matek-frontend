import React from "react";
import { Tex } from "react-tex";

import "./KatexExample.css";

const KatexExample = (props) => {
  return (
    <div className="katex-example-container">
      <div className="katex-example">
        <h3 className="katex-example__title">{props.children}</h3>
      </div>
      <div className="katex-example__display-expression">
        <p>{props.body}</p>
        <p className="display-expression">{props.expression}</p>
      </div>
      <div className="katex-example__display-katex">
        <p>Katex will display the following:</p>
        <Tex texContent={props.expression} />
      </div>
    </div>
  );
};

export default KatexExample;
