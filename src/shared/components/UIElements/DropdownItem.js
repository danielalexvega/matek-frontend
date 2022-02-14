import React from "react";

import "./DropdownItem.css";

const DropdownItem = ({ className, type, onClick, id, children }) => {
    return (
        <button
            className={`dd-list-item ${className || ""}`}
            type={type}
            onClick={onClick}
            key={id}
        >
            {children}
        </button>
    );
};

export default DropdownItem;
