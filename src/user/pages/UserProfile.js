import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

import { useHttpClient } from "../../shared/hooks/http-hook";

import "./UserProfile.css";

const UserProfile = () => {
    const [loadedProfile, setLoadedProfile] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const profileId = useParams().userId;

    useEffect(() => {
        const fetchProfile = async () => {
            let profile;
            try {
                profile = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/users/getUser/${profileId}`
                );

                setLoadedProfile(profile.user);
                console.log(profile.user);
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

    return (
        <div className="page-container">
            <div className="profile-container">
                <div className="title-container">
                    <h1>User Profile</h1>
                </div>
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
                                <Button primary>
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
                        <p className="profile__email">
                            <FontAwesomeIcon icon={faSchool} className="profile-icon"/>
                            <span>{loadedProfile.school}</span>
                        </p>
                        <p className="profile__problem-count">
                            Problem Count: {loadedProfile.problems.length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
