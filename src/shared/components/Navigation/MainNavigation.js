import React, { useState } from "react";

import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import Navbar from "./Navbar";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";
import NavItem from "./NavItem";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

import "./MainNavigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainNavigation = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };

    const problemDropdownItems = [
        { title: "View All Problems" },
        { title: "View Your Problems" },
        { title: "Add Problems" },
    ];

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                {/* THIS MIGHT BECOME A MEGA MENU  */}
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <div className="header-container">
                    <button
                        className="main-navigation__menu-btn"
                        onClick={openDrawerHandler}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <Link className="main-navigation__logo-container" to="/">
                        <img
                            src="./matek-logo-header-transparent.png"
                            alt="Matek logo"
                            className="logo"
                        />
                    </Link>

                    <nav className="main-navigation__header-nav">
                        {/* <NavLinks /> */}
                        <Navbar>
                            <NavItem
                                icon={
                                    <FontAwesomeIcon
                                        className="header-nav__icon"
                                        icon={faPencil}
                                    />
                                }
                            ></NavItem>
                            <NavItem
                                icon={
                                    <FontAwesomeIcon
                                        className="header-nav__icon"
                                        icon={faUserAstronaut}
                                    />
                                }
                            ></NavItem>
                            <NavItem
                                icon={
                                    <FontAwesomeIcon
                                        className="header-nav__icon"
                                        icon={faChevronUp}
                                    />
                                }
                            >
                                <DropdownMenu
                                    main={[
                                    <DropdownMenuItem
                                        leftIcon={
                                            <FontAwesomeIcon
                                                className="header-nav__icon"
                                                icon={faChalkboard}
                                            />
                                        }
                                    >
                                        View All Problems
                                    </DropdownMenuItem>,
                                    <DropdownMenuItem leftIcon={
                                            <FontAwesomeIcon
                                                className="header-nav__icon"
                                                icon={faChalkboardUser}
                                            />
                                        }>
                                        View Your Problems
                                    </DropdownMenuItem>,
                                    <DropdownMenuItem leftIcon={
                                            <FontAwesomeIcon
                                                className="header-nav__icon"
                                                icon={faPlus}
                                            />
                                        }>
                                        Add a Problem
                                    </DropdownMenuItem>
                                    ]}
                                />
                            </NavItem>
                        </Navbar>
                    </nav>
                </div>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;
