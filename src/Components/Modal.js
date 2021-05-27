import React from "react";

const Modal = ({ modalAtEnd, finalMessage, message }) => {
  return (
    <div>
      <div
        className={`${modalAtEnd ? "box" : "hidden"}`}
        onClick={finalMessage}
      >
        <div className="text__home">
          <h1>{message}</h1>
        </div>
      </div>
    </div>
  );
};

export default Modal;
