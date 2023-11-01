import React, { useState } from "react";
import "./addTodos.css";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [todoInput, setTodoInput] = useState<string>("");

  const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  };

  const addTodo = () => {
    if (todoInput) {
      setTodos([...todos, todoInput]);
      setTodoInput("");
    }
  };

  const buttonStyle = {
    color: "grey",
    padding: "6px 40px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const h1Style = {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1 className="mt-5" style={h1Style}>
          Add Todo
        </h1>

        <div className="mt-5">
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Enter a new todo"
            value={todoInput}
            onChange={handleTodoInputChange}
          />
        </div>

        <button
          onClick={addTodo}
          className="btn btn-dark btn-lg mt-3"
          type="button"
          style={buttonStyle}
        >
          Add
        </button>

        <ul className="list-group mt-3">
          {todos.map((todo, index) => (
            <li key={index} className="list-group-item">
              {todo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
