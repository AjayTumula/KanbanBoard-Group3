import React, { useState } from "react";

function CustomInput(props) {
  const {
    text,
    onSubmit,
    displayClass,
    editClass,
    placeholder,
    defaultValue,
    buttonText,
    isAddTask,
  } = props;
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || "");
  const [description, setDescription] = useState(defaultValue || "");

  const submitTask = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      setDescription("");
      onSubmit({inputText, description});
    }
    setIsCustomInput(false);
  };

  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsCustomInput(false);
  };

  return (
    <div className="custom-input">
      {isCustomInput ? (
        <form
          className={`custom-input-edit ${editClass ? editClass : ""}`}
          onSubmit={isAddTask ? submitTask : submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          {isAddTask && 
            <input
              type="text"
              value={description}
              placeholder={'Enter Task Description'}
              onChange={(event) => setDescription(event.target.value)}
              autoFocus
            />
          }
          <div className="custom-input-edit-footer">
            <button type="submit">{buttonText || "Add"}</button>
            <button type="submit" onClick={() => setIsCustomInput(false)}>{"Cancel"}</button>
          </div>
        </form>
      ) : (
        <p
          className={`custom-input-display ${displayClass ? displayClass : ""}`}
          onClick={() => setIsCustomInput(true)}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export default CustomInput;
