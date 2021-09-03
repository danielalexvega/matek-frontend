import React from "react";

const Select = ({id, selectName, label, options}) => {
  return (
    <React.Fragment>
      <label for={id}>{label}</label>
      <select name={selectName} id={id}>
        {options.forEach((option) => (
           <option value={option.value}>{option.title} </option>
        ))}
      </select>
    </React.Fragment>
  );
};

export default Select;
