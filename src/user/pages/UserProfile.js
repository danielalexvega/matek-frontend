import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./UserProfile.css";

const UserProfile = () => {
    const [loadedProfile, setLoadedProfile] = useState();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { token } = useContext(AuthContext);

    const profileId = useParams().userId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
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
            city: {
                value: "",
                isValid: true,
            },
            state: {
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

    useEffect(() => {
        const fetchProfile = async () => {
            let profile;
            try {
                profile = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/users/getUser/${profileId}`
                );

                setLoadedProfile(profile.user);
                setFormData(
                    {
                        email: {
                            value: profile.user.email,
                            isValid: true,
                        },
                        name: {
                            value: profile.user.name,
                            isValid: true,
                        },
                        schoolDistrict: {
                            value: `${
                                profile.user.schoolDistrict
                                    ? profile.user.schoolDistrict
                                    : ""
                            }`,
                            isValid: true,
                        },
                        school: {
                            value: `${
                                profile.user.school ? profile.user.school : ""
                            }`,
                            isValid: true,
                        },
                        city: {
                            value: `${
                                profile.user.city ? profile.user.city : ""
                            }`,
                            isValid: true,
                        },
                        state: {
                            value: `${
                                profile.user.state ? profile.user.state : ""
                            }`,
                            isValid: true,
                        },
                        image: {
                            value: profile.user.image,
                            isValid: true,
                        },
                    },
                    false
                );
            } catch (err) {}
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!isLoading && !loadedProfile) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find that user.</h2>
                </Card>
            </div>
        );
    }

    const showUpdateModalHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelUpdateHandler = () => {
        setShowConfirmModal(false);
    };

    const userUpdateHandler = async (event) => {
        event.preventDefault();
        setShowConfirmModal(false);

        let updatedUser;

        try {
            updatedUser = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users/updateUser/${profileId}`,
                "PATCH",
                JSON.stringify({
                    email: formState.inputs.email.value,
                    name: formState.inputs.name.value,
                    schoolDistrict: formState.inputs.schoolDistrict.value,
                    school: formState.inputs.school.value,
                    city: formState.inputs.city.value,
                    state: formState.inputs.state.value,
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            setLoadedProfile(updatedUser.user);
        } catch (error) {}
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                show={showConfirmModal}
                onCancel={cancelUpdateHandler}
                header="Edit Profile"
                footerClass="problem-item__modal-actions"
                className="update-profile__modal"
                footer={
                    <React.Fragment>
                        <Button primary onClick={cancelUpdateHandler}>
                            CANCEL
                        </Button>
                        <Button danger onClick={userUpdateHandler}>
                            UPDATE
                        </Button>
                    </React.Fragment>
                }
            >
                <Card className="modal__update">
                    <form>
                        <div className="signup-container">
                            <div className="signup-container__left-column">
                                <Input
                                    element="input"
                                    id="name"
                                    type="text"
                                    label="Your Name"
                                    validators={[VALIDATOR_REQUIRE]}
                                    errorText={"Please provide a name."}
                                    onInput={inputHandler}
                                    initialValue={loadedProfile.name}
                                    initialValid={true}
                                />
                                <Input
                                    id="email"
                                    element="input"
                                    type="email"
                                    label="Email"
                                    validators={[VALIDATOR_EMAIL()]}
                                    errorText="Please enter a valid email address."
                                    onInput={inputHandler}
                                    initialValue={loadedProfile.email}
                                    initialValid={true}
                                />
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
                                    initialValue={loadedProfile.school}
                                    initialValid={true}
                                />
                            </div>
                            <div className="signup-container__right-column">
                                <Input
                                    id="city"
                                    element="input"
                                    type="test"
                                    label="City"
                                    validators={[VALIDATOR_REQUIRE]}
                                    errorText="Please enter a city."
                                    onInput={inputHandler}
                                    initialValue={loadedProfile.city}
                                    initialValid={true}
                                />
                                <Input
                                    id="state"
                                    element="input"
                                    type="test"
                                    label="State"
                                    validators={[VALIDATOR_REQUIRE]}
                                    errorText="Please enter a state."
                                    onInput={inputHandler}
                                    initialValue={loadedProfile.state}
                                    initialValid={true}
                                />
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
                                    initialValue={loadedProfile.schoolDistrict}
                                    initialValid={true}
                                />
                            </div>
                        </div>
                    </form>
                </Card>
            </Modal>
            <div className="page-container">
                <div className="profile-container">
                    <div className="details-container">
                        <div className="details-container__left">
                            <Avatar
                                className="profile"
                                image={`${process.env.REACT_APP_ASSET_URL}/images/${loadedProfile.image}`}
                            ></Avatar>
                        </div>
                        <div className="details-container__right">
                            <div className="profile-details-container">
                                <p className="profile__name">
                                    {loadedProfile.name}
                                </p>
                                <p className="profile__email">
                                    {loadedProfile.email}
                                </p>
                            </div>
                            <div className="profile-details-actions">
                                <div>
                                    <Button primary>
                                        <FontAwesomeIcon
                                            className="profile-icon"
                                            icon={faPlus}
                                        />
                                        <span>Add a problem</span>
                                    </Button>
                                    <Button
                                        primary
                                        onClick={showUpdateModalHandler}
                                    >
                                        <FontAwesomeIcon
                                            className="profile-icon"
                                            icon={faPencil}
                                        />
                                        <span>Edit Profile</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="secondary-details-container">
                        <div className="secondary-details-container__details">
                            <p className="profile__detail">
                                <FontAwesomeIcon
                                    icon={faSchool}
                                    className="profile-icon"
                                />
                                <span>{loadedProfile.school}</span>
                            </p>
                            {loadedProfile.schoolDistrict !== "" && (
                                <p className="profile__detail">
                                    <FontAwesomeIcon
                                        icon={faCity}
                                        className="profile-icon"
                                    />

                                    <span>{loadedProfile.schoolDistrict}</span>
                                </p>
                            )}
                            <p className="profile__detail">
                                <FontAwesomeIcon
                                    icon={faToolbox}
                                    className="profile-icon"
                                />
                                <span>
                                    {loadedProfile.problems.length} problems{" "}
                                </span>
                            </p>
                            {loadedProfile.city !== "" && (
                                <p className="profile__detail">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="profile-icon"
                                    />

                                    <span>
                                        {loadedProfile.city}
                                        {loadedProfile.state !== "" && (
                                            <span>, {loadedProfile.state}</span>
                                        )}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserProfile;
