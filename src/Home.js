import React, { useState, useEffect } from "react";

import cardsAndSign from "./Cards";
import Chip from "./Components/Chip.js";
import Header from "./Components/Header.js";
import Buttons from "./Components/Buttons";
import Modal from "./Components/Modal";

import "./Home.css";

const Home = ({ amount, setAmount }) => {
  const [cards, setCards] = useState(cardsAndSign);

  const [cardsUser, setCardsUser] = useState([]);
  const [cardsPc, setCardsPc] = useState([]);

  const [bet, setBet] = useState(0);

  const [pcScore, setPcScore] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const [modalAtEnd, setModalAtEnd] = useState(false);
  const [message, setMessage] = useState("");

  const calculate = (card, setScore) => {
    let total = 0;

    card.forEach((card) => {
      if (card.value !== "A") {
        if (card.value === "J" || card.value === "Q" || card.value === "K") {
          total += 10;
        } else {
          total += card.value;
        }
      }
    });
    const aces = cardsUser.filter((card) => {
      return card.value === "A";
    });
    aces.forEach((card) => {
      if ((aces.length > 1 && total + 11 > 21) || total + 11 > 21) {
        total += 1;
      } else {
        total += 11;
      }
    });

    setScore(total);
  };

  useEffect(() => {
    calculate(cardsUser, setUserScore);
    calculate(cardsPc, setPcScore);
  }, [cardsUser, cardsPc]);

  useEffect(() => {
    if (
      userScore > 21 ||
      (pcScore > userScore && pcScore <= 21 && cardsPc.length > 1)
    ) {
      setMessage("You Lost");
      modalTime();
      setBet(0);
    } else if (cardsPc.length > 1 && userScore === pcScore) {
      setMessage("It's Tie");
      modalTime();
      setAmount((prevAmount) => prevAmount + bet);
      setBet(0);
    } else if (userScore === 21 || pcScore > 21) {
      setMessage("You Win");
      modalTime();
      setAmount((prevAmount) => prevAmount + bet * 2);
      setBet(0);
    }
  }, [userScore, pcScore]); // check who is winner

  useEffect(() => {
    if (userScore > pcScore && cardsPc.length > 1) {
      setTimeout(() => {
        setCardsPc((prevState) => [...prevState, randomCard()]);
      }, 1500);
    }
  }, [pcScore]); // run pc function until game is finished

  const randomCard = () => {
    const rnObj = cards[Math.floor(Math.random() * cards.length)];
    const removeCard = cards.filter((e) => e !== rnObj);
    setCards(removeCard);
    return rnObj;
  };

  const handleDeal = () => {
    handleHitMe();
    handleHitMe();
    stand();
  }; //deal cards

  const handleHitMe = () => {
    setCardsUser((prevState) => [...prevState, randomCard()]);
  };
  const stand = () => {
    setCardsPc((prevState) => [...prevState, randomCard()]);
  };

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

  function modalTime() {
    setTimeout(() => {
      setModalAtEnd((prev) => !prev);
    }, 2000);
  } // moadl at end

  const finalMessage = () => {
    setModalAtEnd((prev) => !prev);
    if (modalAtEnd === true) {
      setCardsUser([]);
      setCardsPc([]);
      setUserScore(0);
      setPcScore(0);
    }
  }; // reset game

  useEffect(() => {
    if (cards.length === 0) {
      window.location.reload();
    }
  }, [cards]); //reload page if you lost everything

  useEffect(() => {
    if (bet === 0 && amount === 0) {
      setMessage("You Lost everthing");
      setAmount(2000);
    }
  }, [bet]); //reset bet and amonut if you lose everthing

  return (
    <div>
      {modalAtEnd ? (
        <Modal
          modalAtEnd={modalAtEnd}
          finalMessage={finalMessage}
          message={message}
          pcScore={pcScore}
          userScore={userScore}
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
              handleDeal={handleDeal}
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

            {bet === 0 && userScore === 0 ? (
              <div className="placeBet">Place bet: </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
