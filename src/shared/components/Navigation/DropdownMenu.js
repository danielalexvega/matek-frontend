import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./DropdownMenu.css";

const DropdownMenu = ({ main, menuTitle }) => {
    const [activeMenu, setActiveMenu] = useState("main");

    return (
        <div className="dropdown-menu">
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
            >
                <div className="dropdown-menu__container">
                    <h3 className="container__menu-title">{menuTitle}</h3>
                    <div className="container__menu">
                        {main.map((menuItem) => menuItem)}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default DropdownMenu;
