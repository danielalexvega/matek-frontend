import React, { useState } from "react";
import Button from "../FormElements/Button";
import DropdownItem from "./DropdownItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";

import "./Dropdown.css";

const Dropdown = ({
    headerTitle,
    list,
    selectItem,
    isSelected,
    selectAll,
    deselectAll,
}) => {
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
                    <DropdownItem
                        type="button"
                        id="select-all"
                        className="select-all"
                        onClick={() => selectAll()}
                    >
                        <span className="dd-select-all">Select All </span>
                        <FontAwesomeIcon
                            className={`dd_double-check`}
                            icon={faCheckDouble}
                        />
                    </DropdownItem>
                    {list.map((item, index) => (
                        <DropdownItem
                            type="button"
                            id={item.id}
                            onClick={() => selectItem(index)}
                            isSelected={isSelected}
                        >
                            {item.title}{" "}
                            {item.selected && (
                                <FontAwesomeIcon
                                    className={`dd_check`}
                                    icon={faCircleCheck}
                                />
                            )}
                        </DropdownItem>
                    ))}
                    <DropdownItem
                        type="button"
                        id="select-none"
                        className="select-none"
                        onClick={() => deselectAll()}
                    >
                        <span className="dd-select-none">Select None </span>
                        <FontAwesomeIcon
                            className={`dd_circle_x`}
                            icon={faCircleXmark}
                        />
                    </DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Dropdown;
