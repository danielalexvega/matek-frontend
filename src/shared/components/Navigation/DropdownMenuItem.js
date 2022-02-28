import React from "react";

import "./DropdownMenuItem.css";

const DropdownMenuItem = (props) => {
    return (
        <a href="#" className="menu-item">
            <span className="icon-left">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
        </a>
    );
};

export default DropdownMenuItem;
