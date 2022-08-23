import React from "react";
import Card from "./Card";
import CustomInput from "./CustomInput";

const Board = (props) => {
  const {
    board,
    addCard,
    removeCard,
    onDragEnd,
    onDragEnter,
    updateCard,
    tasks,
  } = props;
  const tasksForBoard = tasks.filter((task) => task.status_id === board.id)
  return (
    <div className="board">
      <div className="board-inner" key={board?.id}>
        <div className="board-header">
          <p className="board-header-title">
            {board?.name}
            <span>{tasksForBoard?.length || 0}</span>
          </p>
        </div>
        <div className="board-cards custom-scroll">
          {tasks?.map((item) => {
            return item.status_id === board.id && <Card
              key={item.id}
              card={item}
              boardId={board.id}
              removeCard={removeCard}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              updateCard={updateCard}
            />
          })}
          <CustomInput
            text="+ Add Task"
            placeholder="Enter Task Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={(value) => addCard(board?.id, value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
