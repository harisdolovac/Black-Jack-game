import React from "react";
import "../Css/Chip.css";

import chip from "../assets/images/chip.png";

const Chip = ({ cardsPc, setBet, setAmount, amount }) => {
  const handle500 = () => {
    setBet((prevBet) => prevBet + 500);
    setAmount((prevAmount) => prevAmount - 500);
  };

  const handle100 = () => {
    setBet((prevBet) => prevBet + 100);
    setAmount((prevAmount) => prevAmount - 100);
  };

  const handle10 = () => {
    setBet((prevBet) => prevBet + 10);
    setAmount((prevAmount) => prevAmount - 10);
  };

  return (
    <div className="chip__parent">
      <div
        className={
          amount < 500 || cardsPc.length > 0 ? "hidden" : "chip__wrapper"
        }
        onClick={() => handle500()}
      >
        <div className="chip__text"> 500 </div>
        <img src={chip} alt="chip500" className="chip" />
      </div>

      <div
        onClick={() => handle100()}
        className={
          amount < 100 || cardsPc.length > 0 ? "hidden" : "chip__wrapper"
        }
      >
        <div className="chip__text"> 100 </div>
        <img src={chip} alt="chip100" className="chip" />
      </div>

      <div
        onClick={() => handle10()}
        className={
          amount < 10 || cardsPc.length > 0 ? "hidden" : "chip__wrapper"
        }
      >
        <div className="chip__text"> 10 </div>
        <img src={chip} alt="chip100" className="chip" />
      </div>
    </div>
  );
};

export default Chip;
