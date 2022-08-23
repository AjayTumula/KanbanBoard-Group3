import React, { useCallback, useEffect, useState } from "react";
import Board from "./Board";
import CustomInput from "./CustomInput";
import { getStatusData, getTasksData } from '../api/api';

const KanbanBoard = () => {
const [boards, setBoards] = useState([]);
const [tasks, setTasks] = useState([]);

const fetchData = useCallback(
  async () => {
    const tasksResponse = await getTasksData()
    const statusResponse = await getStatusData()
    setTasks(tasksResponse);
    setBoards(statusResponse);
  },
  [setTasks, setBoards],
);

useEffect(
  () => {
    fetchData();
  },
  [fetchData]
);

const [targetCard, setTargetCard] = useState({
  boardId: 0,
  cardId: 0,
});

const addboardHandler = (name) => {
  const tempBoardsList = [...boards];
  tempBoardsList.push({
    id: Date.now() + Math.random() * 2,
    title: name,
    cards: [],
  });
  setBoards(tempBoardsList);
};

const removeBoard = (boardId) => {
  const boardIndex = boards.findIndex((item) => item.id === boardId);
  if (boardIndex < 0) return;

  const tempBoardsList = [...boards];
  tempBoardsList.splice(boardIndex, 1);
  setBoards(tempBoardsList);
};

const addCardHandler = (boardId, title) => {
  const boardIndex = boards.findIndex((item) => item.id === boardId);
  if (boardIndex < 0) return;

  const tempBoardsList = [...boards];
  tempBoardsList[boardIndex].cards.push({
    id: Date.now() + Math.random() * 2,
    title,
    labels: [],
    date: "",
    tasks: [],
    desc: "",
  });
  setBoards(tempBoardsList);
};

const removeCard = (boardId, cardId) => {
  const boardIndex = boards.findIndex((item) => item.id === boardId);
  if (boardIndex < 0) return;

  const tempBoardsList = [...boards];
  const cards = tempBoardsList[boardIndex].cards;

  const cardIndex = cards.findIndex((item) => item.id === cardId);
  if (cardIndex < 0) return;

  cards.splice(cardIndex, 1);
  setBoards(tempBoardsList);
};

const updateCard = (boardId, cardId, card) => {
  const boardIndex = boards.findIndex((item) => item.id === boardId);
  if (boardIndex < 0) return;

  const tempBoardsList = [...boards];
  const cards = tempBoardsList[boardIndex].cards;

  const cardIndex = cards.findIndex((item) => item.id === cardId);
  if (cardIndex < 0) return;

  tempBoardsList[boardIndex].cards[cardIndex] = card;

  setBoards(tempBoardsList);
};

const onDragEnd = (boardId, cardId) => {
  const sourceBoardIndex = boards.findIndex(
    (item) => item.id === boardId,
  );
  if (sourceBoardIndex < 0) return;

  const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
    (item) => item.id === cardId,
  );
  if (sourceCardIndex < 0) return;

  const targetBoardIndex = boards.findIndex(
    (item) => item.id === targetCard.boardId,
  );
  if (targetBoardIndex < 0) return;

  const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex(
    (item) => item.id === targetCard.cardId,
  );
  if (targetCardIndex < 0) return;

  const tempBoardsList = [...boards];
  const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
  tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
  tempBoardsList[targetBoardIndex].cards.splice(
    targetCardIndex,
    0,
    sourceCard,
  );
  setBoards(tempBoardsList);

  setTargetCard({
    boardId: 0,
    cardId: 0,
  });
};

const onDragEnter = (boardId, cardId) => {
  if (targetCard.cardId === cardId) return;
  setTargetCard({
    boardId: boardId,
    cardId: cardId,
  });
};

  return (
    <div className="app">
        <div className="app-nav">
            <h1>Kanban Board</h1>
        </div>
        <div className="app-boards-container">
        <div className="app-boards">
          {boards.map((item) => (
            <Board
                key={item.id}
                board={item}
                addCard={addCardHandler}
                removeBoard={() => removeBoard(item.id)}
                removeCard={removeCard}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}
                updateCard={updateCard}
                tasks={tasks}
            />
            ))}
            <div className="app-boards-last">
            <CustomInput
                displayClass="app-boards-add-board"
                editClass="app-boards-add-board-edit"
                placeholder="Enter Board Name"
                text="Add Board"
                buttonText="Add Board"
                onSubmit={addboardHandler}
            />
            </div>
        </div>
        </div>
    </div>
  );
};

export default KanbanBoard;