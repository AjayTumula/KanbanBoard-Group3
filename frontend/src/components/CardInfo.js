import React, { useCallback, useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import Modal from "./Modal";
import CustomInput from "./CustomInput";
import Chip from "./Chip";
import { getPriorityList } from "../api/api";
import { Select, MenuItem } from "@mui/material";

function CardInfo(props) {
  const { onClose, card, boardId, updateCard, setShowModal } = props;
  const [priorityId, setPriorityId] = useState(undefined);
  const [cardValues, setCardValues] = useState({
    ...card,
  });

  const [priorityList, setPriorityList] = useState([]);
  
  const fetchPriorities = useCallback(
    async () => {
      const response = await getPriorityList()
      setPriorityList(response);
    },
    [setPriorityList],
  );
  
  useEffect(
    () => {
      fetchPriorities();
    },
    [fetchPriorities]
  );

  const updateTitle = (value) => {
    setCardValues({ ...cardValues, name: value });
  };

  const updateDesc = (value) => {
    setCardValues({ ...cardValues, description: value });
  };

  // const addLabel = (label) => {
  //   const index = cardValues.priority.findIndex(
  //     (item) => item.text === label.text,
  //   );
  //   if (index > -1) return;

  //   setSelectedColor("");
  //   setCardValues({
  //     ...cardValues,
  //     labels: [...cardValues.labels, label],
  //   });
  // };

  // const removeLabel = (label) => {
  //   const tempLabels = cardValues.labels.filter(
  //     (item) => item.text !== label.text,
  //   );

  //   setCardValues({
  //     ...cardValues,
  //     labels: tempLabels,
  //   });
  // };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardValues({
      ...cardValues,
      tasks: [...cardValues.tasks, task],
    });
  };

  const removeTask = (id) => {
    const tasks = [...cardValues.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setCardValues({
      ...cardValues,
      tasks: tempTasks,
    });
  };

  const updateTask = (id, value) => {
    // const tasks = [...cardValues];

    // const index = tasks.findIndex((item) => item.id === id);
    // if (index < 0) return;

    // tasks[index].completed = Boolean(value);

    // setCardValues({
    //   ...cardValues,
    //   tasks,
    // });
  };

  const calculatePercent = () => {
    if (!cardValues.remainingHours) return 0;
    const completed = cardValues
    return (completed / cardValues.tasks?.length) * 100;
  };

  const updateDate = (date) => {
    if (!date) return;

    setCardValues({
      ...cardValues,
      date,
    });
  };

  useEffect(() => {
    // if (updateCard) updateCard(boardId, cardValues.id, cardValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardValues]);

  const calculatedPercent = calculatePercent();
  console.log('cardValues.date', cardValues.date)
  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <CustomInput
            defaultValue={cardValues.name}
            text={cardValues.name}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <List />
            <p>Description</p>
          </div>
          <CustomInput
            defaultValue={cardValues.description}
            text={cardValues.description || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={new Date(cardValues.date)}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Tag />
            <p>Priority</p>
          </div>
          <div className="cardinfo-box-labels">
            <Chip 
              label={cardValues.priority}
            //  removeLabel={(removeLabel)}
             />
          </div>
          <div className="cardinfo-box-select">
            <Select
              label="Priority"
              // value={cardValues.priority}
              // onChange={handleChange}
            >
              {
                priorityList.map((priority, index) =>
                <MenuItem key={index} value={priority.name}>{priority.name}</MenuItem>
              )}
            </Select>
          </div>
          {/* <ul>
            {colorsList.map((item, index) => (
              <li
                key={index}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li-active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul> */}
          {/* <Dropdown
            class="board-dropdown"
            // text="Change Priority"
            // placeholder="Select"
            // onSubmit={(value) =>
            //   addLabel({ color: selectedColor, text: value })
            // }
          >
            <ul>
              {priorityList.map((item, index) => (
                <li
                  key={index}
                  style={{ backgroundColor: item }}
                  // className={selectedColor === item ? "li-active" : ""}
                  onClick={() => setPriorityId(item.id)}
                >
                  {item.value}
                </li>
              ))}
            </ul>
          </Dropdown> */}
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p>Progress</p>
          </div>
          <div className="cardinfo-box-progress-bar">
            <div
              className="cardinfo-box-progress"
              style={{
                width: `${calculatedPercent}%`,
                backgroundColor: calculatedPercent === 100 ? "limegreen" : "",
              }}
            />
          </div>
          <div className="cardinfo-box-task-list">
            {cardValues.tasks?.map((item) => (
              <div key={item.id} className="cardinfo-box-task-checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <div className="custom-input-edit-footer">
            <button type="submit">{"Save"}</button>
            <button type="submit" onClick={() => setShowModal(false)}>{"Cancel"}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
