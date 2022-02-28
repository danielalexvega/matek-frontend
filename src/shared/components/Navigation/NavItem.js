import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ReactTooltip from "react-tooltip";

import "./NavItem.css";

const NavItem = ({ icon, tooltip, tooltipId, tooltipText, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            {tooltip && <a
                href="#"
                className="icon-button"
                onClick={() => setOpen(!open)}
                data-tip
                data-for={tooltipId}
            >
                {icon}
            </a>}
            {!tooltip && <a
                href="#"
                className="icon-button"
                onClick={() => setOpen(!open)}
            >
                {icon}
            </a>}
            {(tooltip === true) && <ReactTooltip id={tooltipId} type="info" effect="solid" delayShow={250}>
                <span>{tooltipText}</span>
            </ReactTooltip>}
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
