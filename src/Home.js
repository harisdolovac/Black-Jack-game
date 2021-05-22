import React, { useState, useEffect } from "react";
import "./Home.css";

const Newtest = () => {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "J",
    "Q",
    "K",
    "A",
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "J",
    "Q",
    "K",
    "A",
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "J",
    "Q",
    "K",
    "A",
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "J",
    "Q",
    "K",
    "A",
  ]);
  const [score, setScore] = useState(0);

  const [cardsUsera, setCardsUsera] = useState([]);

  const [cardsPc, setCardsPc] = useState([]);
  const [pcScore, setPcScore] = useState(0);

  const [userScore, setUserScore] = useState(0);
  const [modalAtEnd, setModalAtEnd] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let total = 0;
    cardsUsera.forEach((card) => {
      if (card.value === "A" && total + 11 > 21) {
        total += 1;
      } else if (card.value === "A") {
        total += 11;
      } else if (card.value === "J") {
        total += 10;
      } else if (card.value === "Q") {
        total += 10;
      } else if (card.value === "K") {
        total += 10;
      } else {
        total += card.value;
      }
    });

    setUserScore(total);
  }, [cardsUsera]); //calculate cards for user

  useEffect(() => {
    let total = 0;
    cardsPc.forEach((card) => {
      if (card.value === "A" && total + 11 > 21) {
        total += 1;
      } else if (card.value === "A") {
        total += 11;
      } else if (card.value === "J") {
        total += 10;
      } else if (card.value === "Q") {
        total += 10;
      } else if (card.value === "K") {
        total += 10;
      } else {
        total += card.value;
      }
    });

    setPcScore(total);
  }, [cardsPc]); //calculate cards for Pc

  useEffect(() => {
    console.log(cards);
    if (cards.length === 0) {
      window.location.reload();
    }
  }, [deck, cardsPc]);

  useEffect(() => {
    if (userScore > 21) {
      finalMessage("You Lost");
    } else if (pcScore > userScore && pcScore <= 21) {
      finalMessage("You Lost");
    } else if (userScore === 21) {
      finalMessage("You Win");
    } else if (pcScore > 21) {
      finalMessage("You Win");
    } else if (userScore > 0 && userScore === pcScore) {
      finalMessage("It's Tie");
    }
  }, [userScore, pcScore]); // check who is winner

  useEffect(() => {
    if (userScore > pcScore) {
      setCardsPc((prevState) => [...prevState, rN()]);
    }
  }, [pcScore]); // run pc function until game is finished

  const rN = () => {
    const karta = cards[Math.floor(Math.random() * cards.length)];
    const check = cards.filter((e) => e !== karta);
    setCards(check);

    return { value: karta };
  };

  const handleHitMe = () => {
    setCardsUsera((prevState) => [...prevState, rN()]);
  };

  const finalMessage = (message) => {
    setMessage(message);
    setModalAtEnd((prev) => !prev);

    if (modalAtEnd === true) {
      startGame();
    }
  };

  const stand = () => {
    setCardsPc((prevState) => [...prevState, rN()]);
  };

  const log = () => {
    console.log(deck);
    console.log(cardsUsera);
    console.log(rN());
    console.log(score);
    console.log(pcScore);
  };

  function startGame() {
    setCardsUsera([]);
    setCardsPc([]);
    setUserScore(0);
    setPcScore(0);
  } // resetuje igru

  const Cards = cardsUsera.map((item) => {
    return (
      <div style={{ marginLeft: "35px" }} key={Math.random() * 10000}>
        {item.value}
      </div>
    );
  });

  const randomCardsPC = cardsPc.map((item) => {
    return (
      <div style={{ marginLeft: "35px" }} key={Math.random() * 10000}>
        {item.value}
      </div>
    );
  });

  return (
    <div className="wrapper_home">
      {modalAtEnd ? (
        <div
          className={`${modalAtEnd ? "box" : "hidden"}`}
          onClick={finalMessage}
        >
          <div className="text__home">
            <h1>Tvoj score: {userScore}</h1>
            <h1>Pc score: {pcScore}</h1>
            <h1>{message}</h1>
          </div>
        </div>
      ) : (
        <>
          <h1 style={{ marginTop: "100px" }}>PC score: {pcScore}</h1>
          <h1 style={{ display: "flex", marginLeft: "40px" }}>
            {randomCardsPC}
          </h1>
          <h1>User: {userScore}</h1>
          <h1 style={{ display: "flex", marginLeft: "40px" }}>{Cards}</h1>
          <div className="buttons__home">
            <button
              onClick={() => handleHitMe()}
              className="hit"
              disabled={cardsPc > 0}
            >
              Hit me
            </button>

            <button onClick={() => stand()} disabled={cardsUsera.length === 0}>
              Stand
            </button>
            <button onClick={log}>LOG</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Newtest;
