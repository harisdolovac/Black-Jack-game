import React from "react";
import "../Css/Buttons.css";

const Buttons = ({ handleHitMe, cardsPc, bet, stand, cardsUser }) => {
  return (
    <div className="button__wrapper">
      <button
        onClick={() => handleHitMe()}
        className={cardsPc > 0 || bet === 0 ? "hidden" : "button"}
      >
        Hit me
      </button>

      <button
        onClick={() => stand()}
        className={cardsPc > 0 || bet === 0 ? "hidden" : "button"}
        disabled={cardsUser.length === 0}
      >
        Stand
      </button>
    </div>
  );
};

export default Buttons;
