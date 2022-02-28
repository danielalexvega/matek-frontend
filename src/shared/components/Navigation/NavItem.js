import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./NavItem.css";

const NavItem = ({ icon, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {icon}
            </a>
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
};

export default NavItem;
