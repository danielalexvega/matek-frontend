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
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

const Navbar = () => {
    const { isLoggedIn, logout, userName, userId, userImage } =
        useContext(AuthContext);
    const [loadedUserImage, setLoadedUserImage] = useState("");
    const [open, setOpen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn && userImage) {
            setLoadedUserImage(userImage);
        }
    }, [userImage, isLoggedIn]);

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
                {isLoggedIn && (
                    <NavItem
                        icon={
                            <FontAwesomeIcon
                                className="header-nav__icon"
                                icon={faChevronDown}
                            />
                        }
                        tooltip
                        tooltipId="menu"
                        tooltipText={"Menu"}
                        rotate
                        open={open}
                        setOpen={setOpen}
                    >
                        <DropdownMenu
                            main={[
                                <DropdownMenuItem
                                    key={1}
                                    leftIcon={
                                        <FontAwesomeIcon
                                            className="header-nav__icon"
                                            icon={faChalkboardUser}
                                        />
                                    }
                                    link={`/${userId}/problems`}
                                    open={open}
                                    setOpen={setOpen}
                                >
                                    View Your Problems
                                </DropdownMenuItem>,
                                <DropdownMenuItem
                                    key={2}
                                    leftIcon={
                                        <FontAwesomeIcon
                                            className="header-nav__icon"
                                            icon={faPlus}
                                        />
                                    }
                                    link="/problems/new"
                                    open={open}
                                    setOpen={setOpen}
                                >
                                    Add a Problem
                                </DropdownMenuItem>,
                                <DropdownMenuItem
                                    key={3}
                                    leftIcon={
                                        <FontAwesomeIcon
                                            className="header-nav__icon"
                                            icon={faPencil}
                                        />
                                    }
                                    link="/"
                                    open={open}
                                    setOpen={setOpen}
                                >
                                    Manage Quizzes
                                </DropdownMenuItem>,
                            ]}
                            menuTitle="Menu"
                        />
                    </NavItem>
                )}

                {isLoggedIn && (
                    <NavItemUser
                        loadedUserImage={loadedUserImage}
                        name={userName}
                        tooltipId="viewProfile"
                        tooltipText="View Profile"
                    ></NavItemUser>
                )}
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
