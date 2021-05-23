import React, { useState, useEffect } from "react";
import cardsAndSign from "./Cards";
import "./Home.css";

const Newtest = () => {
  const [cards, setCards] = useState(cardsAndSign);

  const [cardsUser, setCardsUser] = useState([]);

  const [cardsPc, setCardsPc] = useState([]);
  const [pcScore, setPcScore] = useState(0);

  const [userScore, setUserScore] = useState(0);
  const [modalAtEnd, setModalAtEnd] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let total = 0;
    cardsUser.forEach((card) => {
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
  }, [cardsUser]); //calculate cards for user

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
  }, [cards]);

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
      setCardsPc((prevState) => [...prevState, randomCard()]);
    }
  }, [pcScore]); // run pc function until game is finished

  const randomCard = () => {
    const rnObj = cards[Math.floor(Math.random() * cards.length)];
    const removeCard = cards.filter((e) => e !== rnObj);
    setCards(removeCard);
    return rnObj;
  };

  const handleHitMe = () => {
    setTimeout(() => {
      setCardsUser((prevState) => [...prevState, randomCard()]);
    }, 500);
  };

  const finalMessage = (message) => {
    setMessage(message);

    setModalAtEnd((prev) => !prev);

    if (modalAtEnd === true) {
      resetGame();
    }
  };

  const stand = () => {
    setCardsPc((prevState) => [...prevState, randomCard()]);
  };

  function resetGame() {
    setCardsUser([]);
    setCardsPc([]);
    setUserScore(0);
    setPcScore(0);
  } // reset game

  const Cards = cardsUser.map((item) => {
    return (
      <div key={Math.random() * 10000} className="cardsUsera">
        <div className="card">
          {item.value}
          <h1> {item.sign}</h1>
        </div>
      </div>
    );
  });

  const randomCardsPC = cardsPc.map((item) => {
    return (
      <div key={Math.random() * 10000}>
        {item.value}
        {item.sign}
      </div>
    );
  });

  return (
    <div className="">
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
          <div className="wrapper">
            <h1>PC score: {pcScore}</h1>
            <h3>Broj karti u spilu: {cards.length}</h3>
            <h1>{randomCardsPC}</h1>

            <h1>User: {userScore}</h1>

            <h1 className="cards">{Cards}</h1>

            <div className="buttons__home">
              <button onClick={() => handleHitMe()} disabled={cardsPc > 0}>
                Hit me
              </button>

              <button onClick={() => stand()} disabled={cardsUser.length === 0}>
                Stand
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Newtest;
