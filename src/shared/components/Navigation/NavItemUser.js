import React from "react";

import Avatar from "../UIElements/Avatar";
import { useAuth } from "../../hooks/auth-hook";

import "./NavItemUser.css";

const NavItemUser = () => {
    const { userName, userImage } = useAuth();

    let firstName = "";

    if (typeof userName === "string") {
        firstName = userName.split(" ")[0];
    }

    if (userImage) {
        console.log(`${process.env.REACT_APP_ASSET_URL}/images/${userImage}`);
    }

    return (
        <>
            {userImage && (
                <li className="nav-item-user">
                    <Avatar
                        className="navItemUser"
                        image={`${process.env.REACT_APP_ASSET_URL}/images/${userImage}`}
                        alt="Daniel Vega"
                    />
                    <span className="nav-item-user__name">{firstName}</span>
                </li>
            )}
        </>
    );
};

export default NavItemUser;
