import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./DropdownMenu.css";

const DropdownMenu = ({ main }) => {
    const [activeMenu, setActiveMenu] = useState("main");

    
    return (
        <div className="dropdown-menu">
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
            >
                <div className="menu">{main.map((menuItem) => menuItem)}</div>
            </CSSTransition>
        </div>
    );
};

export default DropdownMenu;
