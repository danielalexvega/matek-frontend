import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./UserProfile.css";

const UserProfile = () => {
    const [loadedProfile, setLoadedProfile] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const profileId = useParams().userId;

    useEffect(()=> {
        const fetchProfile = async () => {
            let profile;
            try {
                profile = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/users/getUser/${profileId}`
                );

                console.log(profile);
            } catch (err) {
                
            }
        }

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

    return <div className="profile-container">UserProfile</div>;
};

export default UserProfile;
