import React, { useState } from "react";
import { AlignLeft, CheckSquare, Clock, MoreHorizontal } from "react-feather";
import { formatDate } from "../utils";
import Chip from "./Chip";
import Dropdown from "./Dropdown";
import CardInfo from "./CardInfo";

function Card(props) {
  const { task, boardId, removeCard, onDragEnd, onDragEnter, updateCard } =
    props;
  const { id, name, description, date, tasks, priority } = task;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          task={task}
          boardId={boardId}
          updateCard={updateCard}
          setShowModal={setShowModal}
        />
      )}
      <div
        className="card"
        key={task.id}
        draggable
        onDragEnd={() => onDragEnd(boardId, id)}
        onDragEnter={() => onDragEnter(boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card-top">
          <div className="card-top-labels">
            <Chip label={priority || 'Low'} />
          </div>
          <div
            className="card-top-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeCard(boardId, id)}>Delete Task</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card-title">{name}</div>
        <div>
          <p title={description}>
            <AlignLeft />
          </p>
        </div>
        <div className="card-footer">
          {date && (
            <p className="card-footer-item">
              <Clock className="card-footer-icon" />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="card-footer-item">
              <CheckSquare className="card-footer-icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
