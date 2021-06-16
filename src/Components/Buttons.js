import React from "react";
import "../Css/Buttons.css";

const Buttons = ({
  handleHitMe,
  handleDeal,
  cardsPc,
  bet,
  stand,
  cardsUser,
}) => {
  return (
    <div className="button__wrapper">
      <button
        onClick={() => handleDeal()}
        className={cardsPc.length > 0 || bet === 0 ? "hidden" : "button"}
      >
        Deal
      </button>

      <button
        onClick={() => handleHitMe()}
        className={cardsPc.length === 0 || bet === 0 ? "hidden" : "button"}
        disabled={cardsPc.length > 1}
      >
        Hit me
      </button>

      <button
        onClick={() => stand()}
        className={cardsPc.length === 0 || bet === 0 ? "hidden" : "button"}
        disabled={cardsUser.length === 0}
      >
        Stand
      </button>
    </div>
  );
};

export default Buttons;
