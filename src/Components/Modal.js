import React from "react";

const Modal = ({ modalAtEnd, finalMessage, message, pcScore, userScore }) => {
  return (
    <div>
      <div
        className={`${modalAtEnd ? "box" : "hidden"}`}
        onClick={finalMessage}
      >
        <div className="text__home">
          <h1>{message}</h1>
          <span> Your score:</span> <h1> {userScore}</h1>
          <span> Pc score:</span> <h1> {pcScore}</h1>
        </div>
      </div>
    </div>
  );
};

export default Modal;
