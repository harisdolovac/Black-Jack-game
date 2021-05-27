import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div style={{ backgroundColor: "chocolate" }}>
      <div className="button__wrapper">
        <Link to="/">
          <button className="button">Home</button>
        </Link>
        <Link to="/register">
          <button className="button">Register</button>
        </Link>
        <Link to="/scoreBoard">
          <button className="button">Score Board</button>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
