import React, { useState, useEffect } from "react";
import "./addTodos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const TodoList: React.FC = () => {
  const sampleCategories = ["Personal", "Work", "Shopping", "Health"];
  const [todos, setTodos] = useState<any[]>(() => {
    try {
      const storedTodosJSON = localStorage.getItem("todos");
      if (storedTodosJSON) {
        return JSON.parse(storedTodosJSON);
      }
    } catch (error) {
      console.error("Error while retrieving data from local storage:", error);
    }
    return [];
  });

  const [todoInput, setTodoInput] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error while storing data in local storage:", error);
    }
  }, [todos]);
  const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  };

  const addTodo = () => {
    if (todoInput && selectedCategory) {
      const newTodoItem = { description: todoInput, category: selectedCategory };
      const storedTodosJSON = localStorage.getItem("todos");
      const storedTodos = storedTodosJSON ? JSON.parse(storedTodosJSON) : [];
      storedTodos.push(newTodoItem);
      localStorage.setItem("todos", JSON.stringify(storedTodos));
      setTodos([...todos, newTodoItem]);
      setTodoInput("");
      setSelectedCategory("");
    }
  };

  const copyTodoToClipboard = (todoItem: any) => {
    const { description, category } = todoItem;
    const combinedText = `${description} (Category: ${category})`;
  
    const tempInput = document.createElement("input");
    tempInput.value = combinedText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  
    setCopyMessage("Copied to Clipboard");
    setTimeout(() => {
      setCopyMessage(null);
    }, 3000);
  };
  

  const buttonStyle = {
    color: "grey",
    padding: "6px 40px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const h1Style = {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const tableStyle = {
    border: "2px solid black",
    borderRadius: "5px",
  };

  const thStyle = {
    backgroundColor: "black",
    color: "white",
  };

  const tdStyle = {
    border: "1px solid black",
    padding: "10px",
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container1">
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
          <select
            className="form-control custom-input mt-2"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {sampleCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={addTodo}
            className="btn btn-dark btn-lg mt-3"
            type="button"
            style={buttonStyle}
          >
            Add
          </button>
        </div>

        {copyMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {copyMessage}
          </div>
        )}

        <div className="mt-5">
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Search Todo List"
            value={searchText}
            onChange={handleSearchInputChange}
          />
        </div>

        <table className="table table-striped mt-1" style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Todo #</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todoItem, index) => {
              if (
                todoItem.description.toLowerCase().includes(searchText.toLowerCase()) ||
                (index + 1).toString().includes(searchText)
              ) {
                return (
                  <tr key={index}>
                    <td style={tdStyle}>{index + 1}</td>
                    <td style={tdStyle}>{todoItem.description}</td>
                    <td style={tdStyle}>{todoItem.category}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => copyTodoToClipboard(todoItem)}
                        className="btn btn-dark btn-sm ml-2"
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
