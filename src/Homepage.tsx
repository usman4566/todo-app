import React from "react";
import { Link } from "react-router-dom";

const Homepage: React.FC = () => {
  const buttonStyle = {
    color: "grey",
    padding: "10px 20px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", 
  };

  const h1Style = {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", 
  };
  
  return (
    <div className="text-center">
      <h1 className="mt-5" style={h1Style}>Welcome to the Todo Application</h1>
      <Link
        to="/addtodo"
        className="btn btn-dark mt-5 rounded-pill"
        style={buttonStyle}
      >
        Click Here To Add Todo
      </Link>
    </div>
  );
};

export default Homepage;
