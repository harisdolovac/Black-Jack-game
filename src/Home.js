import React, { useState, useEffect } from "react";
import cardsAndSign from "./Cards";
import "./Home.css";
import Chip from "./Components/Chip.js";
import Header from "./Components/Header.js";
import Buttons from "./Components/Buttons";
import Modal from "./Components/Modal";

const Newtest = () => {
  const [cards, setCards] = useState(cardsAndSign);

  const [cardsUser, setCardsUser] = useState([]);

  const [cardsPc, setCardsPc] = useState([]);
  const [pcScore, setPcScore] = useState(0);

  const [bet, setBet] = useState(0);
  const [amount, setAmount] = useState(2000);

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
    if (cards.length === 0) {
      window.location.reload();
    }
  }, [cards]);

  useEffect(() => {
    if (bet === 0 && amount === 0) {
      finalMessage("You Lost everthing");
    }
  }, [bet]);

  useEffect(() => {
    if (userScore > 21) {
      finalMessage("You Lost");
      setBet(0);
    } else if (pcScore > userScore && pcScore <= 21) {
      finalMessage("You Lost");
      setBet(0);
    } else if (userScore === 21) {
      finalMessage("You Win");
      setAmount((prevAmount) => prevAmount + bet * 2);
      setBet(0);
    } else if (pcScore > 21) {
      finalMessage("You Win");
      setAmount((prevAmount) => prevAmount + bet * 2);
      setBet(0);
    } else if (userScore > 0 && userScore === pcScore) {
      finalMessage("It's Tie");
      setAmount((prevAmount) => prevAmount + bet);
      setBet(0);
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
    //  setTimeout(() => {
    setModalAtEnd((prev) => !prev);
    // }, 200);
    if (modalAtEnd === true) {
      resetGame();
    }
    // setTimeout(() => {
    setMessage(message);
    // }, 250);
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
      <div key={Math.random() * 10000} className="card">
        <div className="card__value">{item.value}</div>

        <div
          className={
            item.sign === "♦" || item.sign === "♥"
              ? "card__sign red"
              : "card__sign"
          }
        >
          {item.sign}
        </div>
      </div>
    );
  });

  const randomCardsPC = cardsPc.map((item) => {
    return (
      <div key={Math.random() * 10000} className="card">
        <div className="card__value"> {item.value}</div>
        <div
          className={
            item.sign === "♦" || item.sign === "♥"
              ? "card__sign red"
              : "card__sign"
          }
        >
          {item.sign}
        </div>
      </div>
    );
  });

  return (
    <div>
      {modalAtEnd ? (
        <Modal
          modalAtEnd={modalAtEnd}
          finalMessage={finalMessage}
          message={message}
        />
      ) : (
        <>
          <div className="wrapper">
            <Header
              userScore={userScore}
              bet={bet}
              amount={amount}
              pcScore={pcScore}
            />
            <div className="content">
              <div className="card__wrapper user">{Cards}</div>
              <div className="card__wrapper pc">{randomCardsPC}</div>
            </div>

            <Buttons
              handleHitMe={handleHitMe}
              cardsPc={cardsPc}
              bet={bet}
              stand={stand}
              cardsUser={cardsUser}
            />

            <Chip
              cardsPc={cardsPc}
              setBet={setBet}
              setAmount={setAmount}
              amount={amount}
            />

            {bet === 0 ? <div className="placeBet">Place bet: </div> : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Newtest;
