import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Todo App
        </Link>{" "}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/addtodo" className="nav-link">
                Create Todo
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/todolist" className="nav-link">
                Todo List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/todocategory" className="nav-link">
                Todo Categories
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
