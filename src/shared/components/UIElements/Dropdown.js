import React, {useState} from "react";

import "./Dropdown.css";

const Dropdown = ({Title, List}) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleList = () => {
        setIsOpen(!isOpen);
    }



    return (
    <div className="dd__wrapper">
        <button type="button" className="dd-header" onClick={toggleList}>
            <div className="dd-header-title"></div>
        </button>
    </div>
    );
};

export default Dropdown;
