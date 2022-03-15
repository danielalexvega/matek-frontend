import React from "react";
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Avatar from "../UIElements/Avatar";

import "./NavItemUser.css";

const NavItemUser = ({
    loadedUserImage,
    name,
    tooltipId,
    tooltipText,
    navlink,
}) => {
    let firstName = "";
    if (typeof name === "string") {
        firstName = name.split(" ")[0];
    }

    return (
        <>
            {loadedUserImage && (
                <>
                    <li className="nav-item-user">
                        <NavLink to={navlink} data-tip data-for={tooltipId}>
                            <Avatar
                                className="navItemUser"
                                image={`${process.env.REACT_APP_ASSET_URL}/images/${loadedUserImage}`}
                                alt="Daniel Vega"
                                data-tip
                                data-for={tooltipId}
                            />
                        </NavLink>
                    </li>
                    <ReactTooltip
                        id={tooltipId}
                        type="info"
                        effect="solid"
                        delayShow={250}
                    >
                        <span>{tooltipText}</span>
                    </ReactTooltip>
                </>
            )}
        </>
    );
};

export default NavItemUser;
