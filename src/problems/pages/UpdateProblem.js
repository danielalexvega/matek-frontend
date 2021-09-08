import React from "react";
import { useParams } from "react-router";
import { Tex } from "react-tex";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import InputList from "../../shared/components/FormElements/InputList";
import InputChoices from "../components/InputChoices";
import KatexPreview from "../components/KatexPreview";
import { useForm } from "../../shared/hooks/form-hook";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MATCH,
} from "../../shared/util/validators";

import "./ProblemForm.css";

const DUMMY_PROBLEMS = [
  {
    id: "p1",
    image: "",
    katex: "int_{a}^{b} f(x)dx = F(b) - F(a)",
    author: "Daniel Vega",
    authorId: "a1",
    rating: "5.0",
    solution: "(-1, 2)",
    isMultipleChoice: true,
    choices: ["(-1, 2)", "(-2, 1)", "(-1, -2)", "(1, 2)"],
    content: "Solving the Square",
    courses: ["Algebra 1", "Algebra 2"],
    description: "I couldn't even tell you.",
  },
  {
    id: "p2",
    image: "",
    katex: `\\begin{cases} 3x + 5y + z  \\\\ 7x – 2y + 4z \\\\ 
        -6x + 3y + 2z \\end{cases}`,
    author: "Daniel Vega",
    authorId: "a2",
    rating: "5.0",
    solution: "(2, -1)",
    isMultipleChoice: true,
    choices: ["(-1, 2)", "(2, -1)", "(-1, -2)", "(2, 1)"],
    content: "Solving the Square",
    courses: ["Algebra 1", "Algebra 2"],
    description:
      "A problem for solving systems of equations with three variables.",
  },
];

const options = [
  { id: 1, value: "exponent-rules", title: "Exponent Rules" },
  { id: 2, value: "fractional-exponents", title: "Fractional Exponents" },
  { id: 3, value: "simplify-radicals", title: "Simplify Radicals" },
  {
    id: 4,
    value: "radicals-and-fractional-exponents",
    title: "Radicals and Fractional Exponents",
  },
  {
    id: 5,
    value: "imaginary-complex-numbers",
    title: "Imaginary/Complex Numbers",
  },
  { id: 6, value: "factoring", title: "Radicals and Fractional Exponents" },
  {
    id: 7,
    value: "advanced-factoring",
    title: "Radicals and Fractional Exponents",
  },
  {
    id: 8,
    value: "quadratic-formula",
    title: "Radicals and Fractional Exponents",
  },
  {
    id: 9,
    value: "complete-the-square",
    title: "Radicals and Fractional Exponents",
  },
  {
    id: 10,
    value: "nature-of-the-roots",
    title: "Radicals and Fractional Exponents",
  },
  {
    id: 11,
    value: "sum-product-of-the-roots",
    title: "Sum/Product of the Roots",
  },
  { id: 12, value: "systems-of-equations", title: "System of Equations" },
  {
    id: 13,
    value: "parabolas-equations-from-directrix-and-focus",
    title: "Parabolos Equations from Directrix and Focus",
  },
  { id: 14, value: "polynomial-operations", title: "Polynomial Operations" },
  { id: 15, value: "polynomial-division", title: "Polynomial Division" },
  { id: 16, value: "polynomial-graphs", title: "Polynomial Graphs" },
  {
    id: 17,
    value: "polynomial-key-features",
    title: "Polynomial Key Features",
  },
  {
    id: 18,
    value: "solving-the-square",
    title: "Solving the Square",
  },
];

const optionsTitles = options.map((option) => option.title);

const UpdateProblem = () => {
  const problemId = useParams().problemId;

  const identifiedProblem = DUMMY_PROBLEMS.find((p) => p.id === problemId);
  const [
    formState,
    inputHandler,
    addChoiceHandler,
    removeChoiceHandler,
    multipleChoiceHandler,
  ] = useForm(
    {
      subjectContent: {
        value: identifiedProblem.content,
        isValid: true,
      },
      katex: {
        value: identifiedProblem.katex,
        isValid: true,
      },
      solution: {
        value: identifiedProblem.solution,
        isValid: true,
      },
      isMultipleChoice: {
        value: identifiedProblem.isMultipleChoice,
        isValid: true,
      },
      choices: {
        value: identifiedProblem.choices,
        isValid: true,
      },
      description: {
        value: identifiedProblem.description,
        isValid: true,
      },
    },
    true
  );

  if (!identifiedProblem) {
    return (
      <div className="center">
        <h2>Could not find a problem.</h2>
      </div>
    );
  }
  return (
    <div className="problem-container">
      <h1 className="problem-container__title">Update a problem.</h1>
      <p className="problem-container__description">
        If you need help with <Tex texContent="\KaTeX" /> syntax, you can check
        out the{" "}
        <a
          href="https://katex.org/"
          target="_blank"
          rel="noreferrer"
          className="description__link"
        >
          documentation.
        </a>
      </p>
      <form className="problem-form">
        <InputList
          id="subjectContent"
          selectName="subjectContent"
          label="Please select a subject content."
          options={options}
          validators={[VALIDATOR_MATCH(optionsTitles)]}
          errorText="Please enter a valid content section"
          onInput={inputHandler}
          type="text"
          placeholder="Exponent Rules"
          listTitle="contentList"
          value={formState.inputs.subjectContent.value}
          valid={true}
        />
        {/* Problem  */}
        <Input
          element="textarea"
          id="katex"
          label="Problem - Written in Katex"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid problem"
          onInput={inputHandler}
          value={formState.inputs.katex.value}
          valid={true}
        />
        <KatexPreview
          title="KaTex Preview"
          texContent={formState.inputs.katex.value}
        />
        {/* Solution  */}
        <Input
          element="input"
          type="text"
          id="solution"
          label="Solution - Written in Katex"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid problem"
          onInput={inputHandler}
          value={formState.inputs.solution.value}
          valid={true}
        />
        <KatexPreview
          title="Katex Preview for Solution"
          texContent={formState.inputs.solution.value}
        />
        <label
          htmlFor="multipleChoiceSelection"
          className="multipleChoiceSelection"
        >
          Is this a multiple choice question?
          <input
            type="checkbox"
            id="multipleChoiceSelection"
            value={formState.inputs.isMultipleChoice}
            onClick={multipleChoiceHandler}
          />
        </label>

        {/* WORKING ON REFACTORING INPUT CHOICES TO ACCEPT VALUES  */}
        {/* {formState.inputs.isMultipleChoice.value && (
          <InputChoices
            choicesArray={formState.inputs.choices.value}
            inputHandler={inputHandler}
            addChoiceHandler={addChoiceHandler}
            removeChoiceHandler={removeChoiceHandler}
          />
        )} */}
      </form>
    </div>
  );
};

export default UpdateProblem;