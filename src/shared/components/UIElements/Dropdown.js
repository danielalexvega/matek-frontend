import React, { useState } from "react";
import Button from "../FormElements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";

import "./Dropdown.css";

const Dropdown = ({ headerTitle, list, selectItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleList = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dd-wrapper">
            <Button type="button" className="dd-header" onClick={toggleList}>
                <span className="dd-header-title">{headerTitle}</span>
                <FontAwesomeIcon className="dd_arrow" icon={faAngleUp} />
            </Button>
            {isOpen && (
                <CSSTransition
                    in={isOpen}
                    timeout={200}
                    classNames="slide-from-top"
                    mountOnEnter
                    unmountOnExit
                >
                    <div role="list" className="dd-list">
                        {list.map((item) => (
                            <Button
                                type="button"
                                className="dd-list-item"
                                id={item.id}
                                onClick={() => selectItem(item)}
                            >
                                {item.title} {item.selected}
                            </Button>
                        ))}
                    </div>
                </CSSTransition>
            )}
        </div>
    );
};

export default Dropdown;
