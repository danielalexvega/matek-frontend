import React from "react";
import { InlineTex } from "react-tex";

const KatexPreview = ({title, texContent}) => {
  return (
    <div className="problem-form__katex-display-container">
      <p className="katex-display-container__title">{title}</p>
      <InlineTex
        className="katex-display-container__katex"
        texContent={texContent}
      />
    </div>
  );
};

export default KatexPreview;
