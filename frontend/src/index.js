import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KanbanBoard from "./components/KanbanBoard";
import "./styles.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="/kanban_board" element={<KanbanBoard/>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
