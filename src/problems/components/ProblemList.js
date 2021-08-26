import React from 'react';

import Card from "../../shared/components/UIElements/Card";
import ProblemItem from "./ProblemItem";
import "./ProblemList.css";

const ProblemList = (props) => {
    if(props.items.length === 0) {
        return <div className="problem-list center">
            <Card>
                <h2>No problems found. Maybe create one?</h2>
                <button>Create Problem</button>
            </Card>
        </div>
    }

    return <ul className="problem-list">
        {props.items.map(problem => {
            <ProblemItem key={problem.id} id={problem.id} image={problem.imgUrl}
               markup={problem.markup} 
            >

            </ProblemItem>
        })}
    </ul>
}

export default ProblemList;
