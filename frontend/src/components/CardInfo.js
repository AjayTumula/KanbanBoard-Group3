import React, { useCallback, useEffect, useState } from "react";
import { Calendar, CheckCircle, List, Tag, User, Type, MessageSquare, Trash2 } from "react-feather";
import Modal from "./Modal";
import CustomInput from "./CustomInput";
import Chip from "./Chip";
import { getCommentsListByTask, getPriorityList, addComment, deleteComment, getUsersByProjectId } from "../api/api";
import { Select, MenuItem } from "@mui/material";

function CardInfo(props) {
  const {
    onClose,
    task,
    // boardId,
    updateCard,
    setShowModal
  } = props;
  // const [priorityId, setPriorityId] = useState(undefined);
  const [cardValues, setCardValues] = useState({
    ...task,
  });
  const [comment, setComment] = useState('');
  const [priorityList, setPriorityList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [refetchData, setRefetchData] = useState(true);
  
  const fetchPriorities = useCallback(
    async () => {
      const response = await getPriorityList()
      setPriorityList(response);
    },
    [setPriorityList],
  );
  
  const fetchComments = useCallback(
    async () => {
      const response = await getCommentsListByTask(task.id)
      setCommentsList(response);
    },
    [setCommentsList, task],
  );

  const fetchUsers = useCallback(
    async () => {
      const response = await getUsersByProjectId(1)
      setUsersList(response);
    },
    [setUsersList],
  );

  useEffect(
    () => {
      if(refetchData) {
        fetchPriorities();
        fetchComments();
        fetchUsers();
        setRefetchData(false);
      }
    },
    [fetchPriorities, fetchComments, refetchData, setRefetchData, fetchUsers]
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

  // const addTask = (value) => {
  //   const task = {
  //     id: Date.now() + Math.random() * 2,
  //     completed: false,
  //     text: value,
  //   };
  //   setCardValues({
  //     ...cardValues,
  //     tasks: [...cardValues.tasks, task],
  //   });
  // };

  // const removeTask = (id) => {
  //   const tasks = [...cardValues.tasks];

  //   const tempTasks = tasks.filter((item) => item.id !== id);
  //   setCardValues({
  //     ...cardValues,
  //     tasks: tempTasks,
  //   });
  // };

  // const updateTask = (id, value) => {
    // const tasks = [...cardValues];

    // const index = tasks.findIndex((item) => item.id === id);
    // if (index < 0) return;

    // tasks[index].completed = Boolean(value);

    // setCardValues({
    //   ...cardValues,
    //   tasks,
    // });
  // };

  const calculatePercent = () => {
    if (!cardValues.progress_hours) return 0;
    const completed = cardValues.progress_hours
    return (completed / cardValues.estimate_hours) * 100;
  };

  const updateDate = (date) => {
    if (!date) return;
    setCardValues({
      ...cardValues,
      date,
    });
  };

  const handleAssigneeChange = (e) => {
    setCardValues({
      ...cardValues,
      assignee_id: e.target.value,
    });
  };

  const handlePriorityChange = (e) => {
    setCardValues({
      ...cardValues,
      priority_id: e.target.value,
      priority: priorityList.find(item => item.id === e.target.value).name
    });
  };

  const handleAddComment = useCallback(
    async () => {
      const newComment = {
        task_id: task.id,
        user_id: 3,
        description: comment
      }
      const response = await addComment(newComment)
      if (response.data.status === 'success') {
        setRefetchData(true);
        setComment('');
      }
    },
    [task, comment, setRefetchData],
  );

  const handleDeleteComment = useCallback(
    async (id) => {
      const response = await deleteComment(id)
      if (response.status === 'success') {
        setRefetchData(true);
      }
    },
    [setRefetchData],
  );

  const handleSubmitForm = useCallback(
    async () => {
      delete cardValues.created_at;
      delete cardValues.updated_at;
      delete cardValues.priority;
      const response = await updateCard(task.id, cardValues)
      if (response === 'success') {
        setRefetchData(true);
      }
    },
    [cardValues, task, updateCard],
  );

  const calculatedPercent = calculatePercent();

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
            defaultValue={new Date(cardValues.date).toISOString().substring(0, 10)}
            min={new Date().toISOString().substring(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <User />
            <p>Assignee</p>
          </div>
          <div className="cardinfo-box-select">
            <Select
              label="Assignee"
              value={cardValues.assignee_id}
              onChange={handleAssigneeChange}
              style={{height: '40px'}}
            >
              {
                usersList.map((user, index) =>
                <MenuItem key={index} value={user.id}>{user.name}</MenuItem>
              )}
            </Select>
          </div>
        </div>
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Tag />
            <p>Priority</p>
          </div>
          <div className="cardinfo-box-labels">
            <Chip 
              label={priorityList.find(item => item.id === cardValues.priority_id)?.name}
            //  removeLabel={(removeLabel)}
             />
          </div>
          <div className="cardinfo-box-select">
            <Select
              label="Priority"
              value={cardValues.priority_id}
              onChange={handlePriorityChange}
              style={{height: '40px'}}
            >
              {
                priorityList.map((priority, index) =>
                <MenuItem key={index} value={priority.id}>{priority.name}</MenuItem>
              )}
            </Select>
          </div>
        </div>
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckCircle />
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
          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <MessageSquare />
              <p>Comments</p>
            </div>
            {commentsList.map((comment, index) => <li key={index}>
              <span className="comment-container">
                {comment.username} : {comment.description}
                  <Trash2 className="trash-icon" onClick={() => handleDeleteComment(comment.id)}/>
                </span>
            </li>)}
            <div className="cardinfo-box-comment">
              <textarea className="cardinfo-box-comment-box" value={comment} onChange={(e)=>setComment(e.target.value)} />
              <button className="add-comment-button" type="submit" onClick={handleAddComment}>{"Add comment"}</button>
            </div>
          </div>
          <div className="custom-input-edit-footer">
            <button type="submit" onClick={handleSubmitForm}>{"Save"}</button>
            <button type="submit" onClick={() => setShowModal(false)}>{"Cancel"}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
