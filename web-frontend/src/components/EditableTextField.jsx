/*
  This component is a text field with buttons which make it editable.
  > initial value = hydration value
  > className = to apply style (do not include height, weight and text size)
  > set height weight and textSize separately 
*/
import React from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faXmark } from "@fortawesome/free-solid-svg-icons";

const EditableTextField = ({ initialValue, className }) => {
  const [value, setValue] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const [beforeEditValue, setBeforeEditValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setBeforeEditValue(value);
    setIsEditable(false);
  };

  const makeEditable = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setValue(beforeEditValue);
    setIsEditable(false);
  };

  if (!isEditable) {
    return (
      <div className={twMerge("flex space-x-5 items-end ", className)}>
        <h3 onDoubleClick={makeEditable}>{value}</h3>
        <button onClick={makeEditable}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
    );
  } else {
    return (
      <div className={twMerge("flex space-x-5 items-end ", className)}>
        <input
          className={"bg-white border-2 border-slate-500 focus:border-slate-500 "}
          type="text"
          value={value}
          onChange={handleChange}
          autoFocus
        />
        <button onClick={handleBlur}>
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button onClick={handleCancel}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    );
  }
};

export default EditableTextField;
