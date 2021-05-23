import React, { useState, useEffect } from "react";
import cardsAndSign from "./Cards";
import "./Home.css";

const Newtest = () => {
  const [cards, setCards] = useState(cardsAndSign);

  const [cardsUser, setCardsUser] = useState([
    // { value: "A", sign: "♠" },
    // { value: "A", sign: "♦" },
  ]);

  const [cardsPc, setCardsPc] = useState([
    // { value: "A", sign: "♠" },
    // { value: "A", sign: "♦" },
  ]);
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
      setTimeout(() => {
        setCardsPc((prevState) => [...prevState, randomCard()]);
      }, 1000);
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
    }, 100);
  };

  const finalMessage = (message) => {
    // //  setTimeout(() => {
    // setModalAtEnd((prev) => !prev);
    // // }, 200);
    // if (modalAtEnd === true) {
    //   resetGame();
    // }
    // // setTimeout(() => {
    // setMessage(message);
    // // }, 250);
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
      <div key={Math.random() * 10000} className="cards">
        <div className="card__value">{item.value}</div>
        <div className="card__sign"> {item.sign}</div>
      </div>
    );
  });

  const randomCardsPC = cardsPc.map((item) => {
    return (
      <div key={Math.random() * 10000} className="cards">
        <div className="card__value"> {item.value}</div>
        <div className="card__sign"> {item.sign}</div>
      </div>
    );
  });

  return (
    <div>
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

            <span className="wrapper__Cards">{randomCardsPC}</span>
            <div>
              <h1>User: {userScore}</h1>
            </div>

            <span className="wrapper__Cards">{Cards}</span>

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
