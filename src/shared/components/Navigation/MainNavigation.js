import React, { useState } from "react";

import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import Navbar from "./Navbar";

import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

import "./MainNavigation.css";


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
                        <Navbar></Navbar>
                    </nav>
                </div>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;
