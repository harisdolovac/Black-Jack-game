import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const cards = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "A"];
  const [deck, setDeck] = useState([]); //novi dek sa kartama i njihovim vrednostima
  const [karteUsera, setKarteUsera] = useState([]);
  const [kartePc, setKartePc] = useState([]);
  const [pcScore, setPcScore] = useState(0);

  const [userScore, setUserScore] = useState(0);
  const [modalAtEnd, setModalAtEnd] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    first();
  }, []);

  const first = () => {
    for (let i = 0; i < cards.length; i++) {
      const karta = cards[i];

      let weight = 0;
      if (karta === "J") {
        weight = 5;
      } else if (karta === "Q") {
        weight = 7;
      } else if (karta === "K") {
        weight = 8;
      } else if (karta === "A") {
        weight = 9;
      } else {
        weight = karta;
      }
      let card = { karta, weight };

      setDeck((prevState) => [...prevState, card]);
    }
  }; // dodaje vrednosti kartama

  let x = 0;
  function rN() {
    const rN = deck[Math.floor(Math.random() * deck.length)];
    x = rN;
  } // mesa karte

  function startGame() {
    setKarteUsera([]);
    setKartePc([]);
    setUserScore(0);
    setPcScore(0);
  } // resetuje igru

  let sumUser = 0;

  const handleHitMe = () => {
    rN();
    //setKarteUsera((prevState) => [...prevState, x]);
    karteUsera.push(x);

    const valueUserDeck = karteUsera.reduce((acc, cv) => acc + cv.weight, 0);
    sumUser = valueUserDeck;
    setUserScore(valueUserDeck);

    //setSumaUsera((prevState) => prevState + valueUserDeck);

    if (userScore > 21) {
      tests("You lose");
      startGame();
    }
    if (userScore === 21) {
      tests("You win");
      startGame();
    }
  };

  let sumPc = 0;

  const stand = () => {
    rN();
    //  setKartePc((prevState) => [...prevState, x]);
    kartePc.push(x);
    const valuePcDeck = kartePc.reduce((acc, cv) => acc + cv.weight, 0);
    sumPc = valuePcDeck;
    setPcScore(valuePcDeck);

    calculate();
  };

  const calculate = () => {
    console.log(userScore, sumPc);
    while (userScore > sumPc) {
      stand();
      if (sumPc > 21) {
        tests("You win");
        startGame();
      } else if (sumPc == userScore) {
        startGame();
        tests("Tie");
      } else if (sumPc > userScore && sumPc <= 21) {
        startGame();
        tests("You lose");
      }
    }
    console.log("tvoj score je : ", userScore);
    console.log("pc score je : ", sumPc);
  }; // proverava uslove

  const karte = karteUsera.map((item) => {
    return (
      <h1 style={{ marginLeft: "35px" }} key={Math.random() * 10000}>
        {item.karta}
      </h1>
    );
  });

  const RandomKartePc = kartePc.map((item) => {
    return (
      <h1 style={{ marginLeft: "35px" }} key={Math.random() * 10000}>
        {item.karta}
      </h1>
    );
  });

  const tests = (message) => {
    setMessage(message);
    setModalAtEnd((prev) => !prev);
  };

  return (
    <div className="wrapper_home">
      {modalAtEnd ? (
        <div className={`${modalAtEnd ? "box" : "hidden"}`} onClick={tests}>
          <div className="text__home">
            <h1>Tvoj score: {userScore}</h1>
            <h1>Pc score: {pcScore}</h1>
            <h1>{message}</h1>
          </div>
        </div>
      ) : (
        <>
          <h1>PC: {pcScore}</h1>
          <h1 style={{ display: "flex", marginLeft: "40px" }}>
            {RandomKartePc}
          </h1>
          <h1>User: {userScore}</h1>
          <h1 style={{ display: "flex", marginLeft: "40px" }}>{karte}</h1>
          <div className="buttons__home">
            <button onClick={() => handleHitMe()} className="hit">
              Hit me
            </button>

            <button onClick={() => stand()}>Stand</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
