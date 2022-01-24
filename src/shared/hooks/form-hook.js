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

// const courseChoices;

// const fectchCourseChoices = async () => {
// try {
//     const response = await fetch( process.env.REACT_APP_BACKEND_URL + "/courses/");
//     if(response.ok) {
//         const responseData = await response.json();
//         return responseData;
//     }
// } catch (error) {
//     console.log(error);
// }
// };

// const courseChoices = fectchCourseChoices();
// console.log(courseChoices);

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;
                }
                if (inputId !== "choices" && inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else if (
                    inputId === "choices" &&
                    state.inputs.isMultipleChoice.value &&
                    action.inputId &&
                    action.inputId.includes("choice")
                ) {
                    formIsValid = formIsValid && action.isValid;

                    let updateIndex;
                    state.inputs.choices.value.forEach((choice, index) => {
                        if (choice.id === action.inputId) {
                            updateIndex = index;
                        }
                    });

                    console.log(updateIndex);

                    let updatedChoice = {
                        id: action.inputId || "choiceA",
                        label:
                            state.inputs.choices.value[updateIndex].label ||
                            "A",
                        value: action.value,
                        isValid: action.isValid,
                    };

                    let updatedChoicesArray = [...state.inputs.choices.value];
                    updatedChoicesArray.splice(updateIndex, 1, updatedChoice);

                    return {
                        ...state,
                        inputs: {
                            ...state.inputs,
                            choices: {
                                value: updatedChoicesArray,
                                isValid: true,
                            },
                        },
                        isValid: formIsValid,
                    };
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

        case "SELECT_IMAGE_CHOICE":
            let updateImageSelection = !state.inputs.hasImage.value;

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    hasImage: {
                        value: updateImageSelection,
                        isValid: true,
                    },
                },
            };

        case "SET_DATA":
            return {
                inputs: action.inputs,
                isValid: action.formIsValid,
            };

        // case "SET_COURSE_LIST":
        //     return {
        //         ...state,
        //         inputs: {
        //             ...state.inputs,
        //             courseList: {
        //                 value: action.courseList,
        //             },
        //         },
        //     };
        default:
            return state;
    }
};

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    //useForm needs to know the course
    // I don't think I need to use state inside the useForm function
    // const [test, setTest] = useState(null);

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

    const imageSelectionHandler = () => {
        dispatch({
            type: "SELECT_IMAGE_CHOICE",
        });
    };

    // const setChoiceList = (courseList) => {
    //     console.log("this is it");
    //     dispatch({
    //         type: "SET_COURSE_LIST",
    //         courseList: courseList,
    //     });
    // };

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: "SET_DATA",
            inputs: inputData,
            formIsValid: formValidity,
        });
    }, []);

    return [
        formState,
        inputHandler,
        setFormData,
        addChoiceHandler,
        removeChoiceHandler,
        multipleChoiceHandler,
        imageSelectionHandler,
    ];
};
