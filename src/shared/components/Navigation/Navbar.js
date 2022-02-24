import React from "react";

import "./Navbar.css";

const Navbar = ({children}) => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {children}
            </ul>
        </nav>
    );
};

export default Navbar;
