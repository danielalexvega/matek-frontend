import React from "react";
import { NavLink } from "react-router-dom";

import "./DropdownMenuItem.css";

const DropdownMenuItem = ({
    link,
    leftIcon,
    rightIcon,
    children,
    open,
    setOpen,
}) => {
    return (
        <>
            {link && (
                <NavLink to={link} className="menu-item">
                    <button
                        className="menu-item__button"
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        <span className="icon-left">{leftIcon}</span>
                        {children}
                    </button>
                    <span className="icon-right">{rightIcon}</span>
                </NavLink>
            )}
        </>
    );
};

export default DropdownMenuItem;
