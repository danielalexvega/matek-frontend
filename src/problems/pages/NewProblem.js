import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import "./NewProblem.css";

const NewProblem = () => {
    return (
        <form className="problem-form">
            <Input element="input" type="text" label="Title" validators={[]} errorText="Please enter a valid title"/>
        </form>
    )
}

export default NewProblem;
