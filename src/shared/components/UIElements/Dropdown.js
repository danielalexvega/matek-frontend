import React, { useState } from "react";
import Button from "../FormElements/Button";
import DropdownItem from "./DropdownItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";

import "./Dropdown.css";

const Dropdown = ({ headerTitle, list, selectItem, isSelected }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleList = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dd-wrapper">
            <Button
                type="button"
                className={`dd-header ${isOpen && "dd-header__open"}`}
                onClick={toggleList}
            >
                <span className="dd-header-title">{headerTitle}</span>
                <FontAwesomeIcon
                    className={`dd_arrow ${isOpen ? "dd_arrow_flip" : ""}`}
                    icon={faAngleUp}
                />
            </Button>
            <CSSTransition
                in={isOpen}
                timeout={200}
                classNames="slide-from-top"
                unmountOnExit
            >
                <div role="list" className={`dd-list`}>
                    {list.map((item) => (
                        <DropdownItem
                            type="button"
                            id={item.id}
                            onClick={() => selectItem(item)}
                            isSelected={isSelected}
                        >
                            {item.title} {item.selected}
                        </DropdownItem>
                    ))}
                </div>
            </CSSTransition>
        </div>
    );
};

export default Dropdown;
