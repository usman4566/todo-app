import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const TodoList: React.FC = () => {
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
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

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

  return (
    <div className="container1">
      <div className="text-center">
        <h1 className="mt-3" style={h1Style}>
          Todo List
        </h1>

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
