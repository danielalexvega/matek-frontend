import { useCallback, useReducer } from "react";

const choiceLetterArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
  ];
  


const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId !== "choices" && inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else if (
          inputId === "choices" &&
          state.inputs.isMultipleChoice.value &&
          action.inputId.includes("choice")
        ) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };

    case "ADD_CHOICE":
      let newChoice = {
        id: action.id,
        label: action.label,
        value: "",
        isValid: false,
      };

      return {
        ...state,
        inputs: {
          ...state.inputs,
          choices: {
            value: [...state.inputs.choices.value, newChoice],
          },
        },
      };

    case "REMOVE_CHOICE":
      let updatedChoices = [...state.inputs.choices.value];
      updatedChoices.pop();

      return {
        ...state,
        inputs: {
          ...state.inputs,
          subjectContent: {
            ...state.inputs.subjectContent,
          },
          katex: {
            ...state.inputs.katex,
          },
          solution: {
            ...state.inputs.solution,
          },
          isMultipleChoice: { ...state.inputs.isMultipleChoice },
          choices: {
            value: [...updatedChoices],
          },
          description: {
            ...state.inputs.description,
          },
        },
      };

    case "SELECT_MULTIPLE_CHOICE":
      let updatedChoice = !state.inputs.isMultipleChoice.value;
      return {
        ...state,
        inputs: {
          ...state.inputs,
          isMultipleChoice: {
            value: updatedChoice,
            isValid: true,
          },
        },
      };

    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const addChoiceHandler = (event) => {
    event.preventDefault();
    let choiceIndex = formState.inputs.choices.value.length;
    dispatch({
      type: "ADD_CHOICE",
      id: `choice${choiceLetterArray[choiceIndex]}`,
      label: choiceLetterArray[choiceIndex],
    });
  };

  const removeChoiceHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: "REMOVE_CHOICE",
    });
  };

  const multipleChoiceHandler = () => {
    dispatch({
      type: "SELECT_MULTIPLE_CHOICE",
    });
  };

  return [formState, inputHandler, addChoiceHandler, removeChoiceHandler, multipleChoiceHandler]
};
