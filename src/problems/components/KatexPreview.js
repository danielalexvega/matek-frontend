import React from "react";
import { InlineTex } from "react-tex";

import "./KatexPreview.css";

const KatexPreview = ({title, texContent, katexClassName}) => {
  return (
    <div className={`problem-form__katex-display-container ${katexClassName}`}>
      <p className="katex-display-container__title">{title}</p>
      <InlineTex
        className="katex-display-container__katex"
        texContent={texContent}
      />
    </div>
  );
};

export default KatexPreview;
