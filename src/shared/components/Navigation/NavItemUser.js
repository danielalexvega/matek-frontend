import React from "react";

import Avatar from "../UIElements/Avatar";

import "./NavItemUser.css";

const NavItemUser = ({loadedUserImage, name}) => {

    let firstName = "";
    if (typeof name === "string") {
        firstName = name.split(" ")[0];
    }

    if (loadedUserImage) {
        console.log(`${process.env.REACT_APP_ASSET_URL}/images/${loadedUserImage}`);
    }

    return (
        <>
            {loadedUserImage && (
                <li className="nav-item-user">
                    <Avatar
                        className="navItemUser"
                        image={`${process.env.REACT_APP_ASSET_URL}/images/${loadedUserImage}`}
                        alt="Daniel Vega"
                    />
                    <span className="nav-item-user__name">{firstName}</span>
                </li>
            )}
        </>
    );
};

export default NavItemUser;
