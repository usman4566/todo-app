import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todo from "./Add Todos/addTodos";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import TodoList from "./Todo List/todoList";
import TodoCategories from "./Todo Categories/todoCategories";
import Homepage from "./Homepage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/addtodo" element={<Todo />} />
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/todocategory" element={<TodoCategories />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
