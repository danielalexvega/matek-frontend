import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

import "./Auth.css";

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { login } = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const history = useHistory();

    const routeChange = () => {
        history.push(`/`);
    };

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    image: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        isValid: false,
                    },
                    schoolDistrict: {
                        value: "",
                        isValid: true,
                    },
                    school: {
                        value: "",
                        isValid: true,
                    },
                    image: {
                        value: null,
                        isValid: false,
                    },
                },
                false
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    const authSubmitHandler = async (event) => {
        event.preventDefault();

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    "https://matek-backend.herokuapp.com/api/users/login",
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );

                login(
                    responseData.userId,
                    responseData.name,
                    responseData.token,
                    null,
                    responseData.image
                );

                routeChange();
            } catch (error) {
                // error state is set in custom hook
            }
        } else {
            try {
                const formData = new FormData();
                formData.append("email", formState.inputs.email.value);
                formData.append("name", formState.inputs.name.value);
                formData.append("password", formState.inputs.password.value);
                formData.append("image", formState.inputs.image.value);

                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/users/signup",
                    "POST",
                    formData
                );

                console.log(responseData.image);

                login(
                    responseData.userId,
                    responseData.userName,
                    responseData.token,
                    null,
                    responseData.image
                );
                routeChange();
            } catch (err) {}
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            validators={[VALIDATOR_REQUIRE]}
                            errorText={"Please provide a name."}
                            onInput={inputHandler}
                            placeholder="Dewey Finn"
                        />
                    )}
                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                        placeholder="Dewey.Finn@HoraceGreenPrep.com"
                    />
                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        errorText="Please enter a valid password with at least 8 characters."
                        onInput={inputHandler}
                    />
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="schoolDistrict"
                            type="text"
                            label="School District"
                            validators={[VALIDATOR_REQUIRE]}
                            errorText={
                                "Please provide a School District. At this time, Matek is only for teachers."
                            }
                            onInput={inputHandler}
                        />
                    )}
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="school"
                            type="text"
                            label="School"
                            validators={[VALIDATOR_REQUIRE]}
                            errorText={
                                "Please provide a School. At this time, Matek is only for teachers."
                            }
                            onInput={inputHandler}
                            placeholder="Horace Green Prep"
                        />
                    )}
                    {!isLoginMode && (
                        <ImageUpload
                            id="image"
                            center
                            onInput={inputHandler}
                            errorTest="Please provide an image."
                        />
                    )}
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? "LOGIN" : "SIGNUP"}
                    </Button>
                </form>
                <Button primary onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
                </Button>
            </Card>
        </React.Fragment>
    );
};

export default Auth;
