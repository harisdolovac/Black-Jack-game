import React, { useState, useEffect } from "react";
import "./Practice.css";

const Practice = () => {
  const [numbers, setNumbers] = useState([{ card: 1, value: "♠" }]);

  const [numD, setNumD] = useState(2);

  const mapping = numbers.map((item) => {
    return (
      <div className="card1">
        <div className="number">{item.card}</div>
        <div className="sign">{item.value}</div>
      </div>
    );
  });

  const addCard = () => {
    setNumD((prevState) => prevState + 1);

    const karte = { card: numD, value: "♠" };
    console.log(karte);

    setNumbers([...numbers, karte]);
    console.log(numbers);
  };

  useEffect(() => {
    console.log(numbers);
  }, [numbers]);

  return (
    <div className="background">
      <div className="header">header</div>
      <div className="buttons">
        <button onClick={addCard}>Add card</button>
        <button>Add card</button>
      </div>
      <div className="footer">footer</div>
    </div>
  );
};

export default Practice;
