import React from "react";
import "../Css/Header.css";
import Navigation from "./Navigation";

const Header = ({ userScore, bet, amount, pcScore }) => {
  return (
    <div>
      <div className="header">
        <div>
          <h1>User:</h1>
          <h1>{userScore}</h1>
          <h2>Bet {bet}</h2>
        </div>
        <div>
          <h2>Total:</h2>
          <h2>amount:</h2>
          <h1>{amount}</h1>
        </div>
        <div>
          <h1>PC score:</h1>
          <h1> {pcScore}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
