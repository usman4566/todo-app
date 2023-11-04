import React, { useState, useEffect } from "react";

const TodoCategories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(["Personal", "Work", "Shopping", "Health"]);
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    try {
      const storedTodosJSON = localStorage.getItem("todos");
      if (storedTodosJSON) {
        setTodos(JSON.parse(storedTodosJSON));
      }
    } catch (error) {
      console.error("Error while retrieving data from local storage:", error);
    }
  }, []);

  const tableStyle: React.CSSProperties = {
    border: "2px solid black",
    borderRadius: "5px",
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: "black",
    color: "white",
  };

  const tdStyle: React.CSSProperties = {
    border: "1px solid black",
    padding: "10px",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap" as "wrap",
  };

  const tableContainerStyle: React.CSSProperties = {
    flex: "1",
    margin: "10px",
  };

  const h5Style = {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };
  
  const h1Style = {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  return (
    <div className="container1 mt-5">
      <div className="text-center">
        <h1 style={h1Style}>Add Todo</h1>
      </div>
      <div style={rowStyle} className="mt-5">
        {categories.map((category) => (
          <div key={category} style={tableContainerStyle}>
            <h5 style={h5Style}>{category} Category</h5>
            <table className="table table-striped" style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Todo #</th>
                  <th style={thStyle}>Description</th>
                </tr>
              </thead>
              <tbody>
                {todos
                  .filter((todo) => todo.category === category)
                  .map((todo, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{index + 1}</td>
                      <td style={tdStyle}>{todo.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoCategories;
