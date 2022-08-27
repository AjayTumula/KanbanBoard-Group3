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
    isAddProject
  } = props;
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || "");
  const [description, setDescription] = useState(defaultValue || "");
  const [startDate, setStartDate] = useState(defaultValue || ""); //set to today's date?
  const [endDate, setEndDate] = useState(defaultValue || ""); //set to today's date?

  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText(""); 
      if(isAddProject){ 
        setDescription("");
        setStartDate(""); //set to today's date?
        setEndDate(""); //set to today's date?
        onSubmit({inputText, description, startDate, endDate});
      }
      else if(isAddTask){
        setDescription("");
        onSubmit({ inputText, description });
      }
      else onSubmit(inputText);      
    }
    setIsCustomInput(false);
  };

  return (
    <div className="custom-input">
      {isCustomInput ? (
        <form
          className={`custom-input-edit ${editClass ? editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          {(isAddTask || isAddProject) &&
            <input
              type="text"
              value={description}
              placeholder={'Enter Description'}
              onChange={(event) => setDescription(event.target.value)}
              autoFocus
            />
          }
          {isAddProject &&
            <><input
              type="date"
              value={startDate}
              placeholder={'Enter Start Date'}
              onChange={(event) => setStartDate(event.target.value)}
              autoFocus
            />
              <input
                type="date"
                value={endDate}
                placeholder={'Enter End Date'}
                onChange={(event) => setEndDate(event.target.value)}
                autoFocus
              />
            </>
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
