import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";
import NavItem from "./NavItem";
import NavItemUser from "./NavItemUser";
import { AuthContext } from "../../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

const Navbar = () => {
    const { isLoggedIn, logout, userName, userImage } = useContext(AuthContext);
    const [loadedUserImage, setLoadedUserImage] = useState("");
    const history = useHistory();

    useEffect(()=>{
        if(isLoggedIn && userImage) {
            console.log(userImage);
            setLoadedUserImage(userImage);
        }
    },[userImage, isLoggedIn]);

    const handleLogout = () => {
        logout();
        history.push(`/`);
    };

    const problemDropdownItems = [
        { title: "View All Problems" },
        { title: "View Your Problems" },
        { title: "Add Problems" },
    ];

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {/* View Problems */}
                <NavItem
                    icon={
                        <FontAwesomeIcon
                            className="header-nav__icon"
                            icon={faChalkboard}
                        />
                    }
                    tooltip
                    tooltipId="viewProblems"
                    tooltipText="View Problems"
                    navlink="/problems"
                ></NavItem>
                {/* Menu  */}
                {isLoggedIn && <NavItem
                    icon={
                        <FontAwesomeIcon
                            className="header-nav__icon"
                            icon={faChevronUp}
                        />
                    }
                    tooltip
                    tooltipId="menu"
                    tooltipText={"Menu"}
                    rotate
                >
                    <DropdownMenu
                        main={[
                            <DropdownMenuItem
                                key={4}
                                leftIcon={
                                    <FontAwesomeIcon
                                        className="header-nav__icon"
                                        icon={faChalkboard}
                                    />
                                }
                            >
                                View All Problems
                            </DropdownMenuItem>,
                            <DropdownMenuItem
                                key={5}
                                leftIcon={
                                    <FontAwesomeIcon
                                        className="header-nav__icon"
                                        icon={faChalkboardUser}
                                    />
                                }
                            >
                                View Your Problems
                            </DropdownMenuItem>,
                            <DropdownMenuItem
                                key={6}
                                leftIcon={
                                    <FontAwesomeIcon
                                        className="header-nav__icon"
                                        icon={faPlus}
                                    />
                                }
                            >
                                Add a Problem
                            </DropdownMenuItem>,
                        ]}

                        menuTitle="Menu"
                    />
                </NavItem>}

                {isLoggedIn && <NavItemUser loadedUserImage={loadedUserImage} name={userName}></NavItemUser>}
                {!isLoggedIn && (
                    <NavItem
                        icon={
                            <FontAwesomeIcon
                                className="header-nav__icon"
                                icon={faKey}
                            />
                        }
                        tooltip
                        tooltipId="logIn"
                        tooltipText="Log In"
                        navlink="/auth"
                        exact
                    ></NavItem>
                )}
                {isLoggedIn && (
                    <NavItem
                        icon={
                            <FontAwesomeIcon
                                className="header-nav__icon"
                                icon={faRightFromBracket}
                            />
                        }
                        tooltip
                        tooltipId="logOut"
                        tooltipText="Log Out"
                        onClick={handleLogout}
                    ></NavItem>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
