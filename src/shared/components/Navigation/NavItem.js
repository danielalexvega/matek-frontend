import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ReactTooltip from "react-tooltip";

import "./NavItem.css";

const NavItem = ({
    icon,
    tooltip,
    tooltipId,
    tooltipText,
    rotate,
    navlink,
    exact,
    children,
    onClick,
    open,
    setOpen
}) => {
   

    if (navlink) {
        return (
            <>
                {tooltip && (
                    <li className={`nav-item`}>
                        <NavLink
                            className="icon-button"
                            data-tip
                            data-for={tooltipId}
                            to={navlink}
                        >
                            {icon}
                        </NavLink>
                    </li>
                )}
                {!tooltip && (
                    <li className={`nav-item`}>
                        <NavLink to={navlink} className="icon-button">
                            {icon}
                        </NavLink>
                    </li>
                )}
                {tooltip === true && (
                    <ReactTooltip
                        id={tooltipId}
                        type="info"
                        effect="solid"
                        delayShow={250}
                    >
                        <span>{tooltipText}</span>
                    </ReactTooltip>
                )}
            </>
        );
    } else if (onClick) {
        return (
            <li
                className={`nav-item ${open && rotate ? "nav-item__open" : ""}`}
            >
                {/* If there is a tooltip  */}
                {tooltip && (
                    <a
                        href="#"
                        className="icon-button"
                        onClick={() => {
                            onClick();
                        }}
                        data-tip
                        data-for={tooltipId}
                    >
                        {icon}
                    </a>
                )}
                {/* If there is not a tooltip  */}
                {!tooltip && (
                    <a
                        href="#"
                        className="icon-button"
                        onClick={() => {
                            onClick();
                        }}
                    >
                        {icon}
                    </a>
                )}
                {tooltip === true && (
                    <ReactTooltip
                        id={tooltipId}
                        type="info"
                        effect="solid"
                        delayShow={250}
                    >
                        <span>{tooltipText}</span>
                    </ReactTooltip>
                )}
                <CSSTransition
                    in={open}
                    unmountOnExit
                    timeout={500}
                    classNames="nav-item-children"
                >
                    <div>{children}</div>
                </CSSTransition>
            </li>
        );
    } else {
        return (
            <li
                className={`nav-item ${open && rotate ? "nav-item__open" : ""}`}
            >
                {/* If there is a tooltip  */}
                {tooltip && (
                    <button
                        href="#"
                        className="icon-button"
                        onClick={() => setOpen(!open)}
                        data-tip
                        data-for={tooltipId}
                    >
                        {icon}
                    </button>
                )}
                {/* If there is not a tooltip  */}
                {!tooltip && (
                    <a
                        href="#"
                        className="icon-button"
                        onClick={() => setOpen(!open)}
                    >
                        {icon}
                    </a>
                )}
                {tooltip === true && (
                    <ReactTooltip
                        id={tooltipId}
                        type="info"
                        effect="solid"
                        delayShow={250}
                    >
                        <span>{tooltipText}</span>
                    </ReactTooltip>
                )}
                <CSSTransition
                    in={open}
                    unmountOnExit
                    timeout={500}
                    classNames="nav-item-children"
                >
                    <div>{children}</div>
                </CSSTransition>
            </li>
        );
    }
};

export default NavItem;