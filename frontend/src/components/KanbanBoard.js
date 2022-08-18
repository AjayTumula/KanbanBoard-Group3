import React, { useEffect, useState } from "react";
import Board from "./Board";
import CustomInput from "./CustomInput";

const KanbanBoard = () => {
const [boards, setBoards] = useState([]);
useEffect(() => {
  fetchData();
}, []);

async function fetchData() {
  const boards = [
    {
      id: 1651319512266.7095,
      title: "TO DO",
      cards: [
        {
          id: 1651319552926.0933,
          title: "Task1",
          labels: [{ color: "#cf61a1", text: "Urgent" }],
          date: "2022-05-05",
          tasks: [
            { id: 1651319625559.8025, completed: true, text: "Task1_subtask1" },
            { id: 1651319629650.8945, completed: true, text: "Task1_subtask2" },
            { id: 1651319633774.9905, completed: true, text: "Task1_subtask3" },
          ],
          desc: "Task1 Detail Description",
        },
        {
          id: 1651319568365.593,
          title: "Task2",
          labels: [{ color: "#1ebffa", text: "Frontend" }],
          date: "",
          tasks: [],
        },
      ],
    },
    {
      id: 1651319523126.113,
      title: "IN PROGRESS",
      cards: [
        {
          id: 1651319672685.5078,
          title: "Task3",
          labels: [{ color: "#9975bd", text: "Database" }],
          date: "",
          tasks: [
            { id: 1651319728301.3855, completed: false, text: "restore db" },
          ],
        },
      ],
    },
    {
      id: 1651319530017.122,
      title: "IN REVIEW",
      cards: [
        {
          id: 1651319677070.0732,
          title: "Task4",
          labels: [{ color: "#8da377", text: "figma" }],
          date: "2022-05-06",
          tasks: [],
        },
      ],
    },
    {
      id: 1651319535931.4182,
      title: "DONE",
      cards: [
        {
          id: 1651319680948.0479,
          title: "Task5",
          labels: [{ color: "#4fcc25", text: "Payment API" }],
          date: "2022-05-04",
          tasks: [
            { id: 1651319820180.9648, completed: false, text: "GraphQl" },
            { id: 1651319833779.3252, completed: true, text: "Restful API" },
          ],
        },
      ],
    },
  ];
  setBoards(boards);
}
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

useEffect(() => {
  // updateLocalStorageBoards(boards);
}, [boards]);
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