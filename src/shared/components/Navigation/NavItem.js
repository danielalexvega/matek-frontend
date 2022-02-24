import React from "react";

import "./NavItem.css";

const NavItem = ({ icon, children }) => {
    return (
        <li className="nav-item">
            <a href="#" className="icon-button">
                {icon}
            </a>
        </li>
    );
};

export default NavItem;
