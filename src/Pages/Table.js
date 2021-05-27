import React, { useState, useEffect } from "react";
import fire from "../fire";

import "../Css/Table.css";

const Table = () => {
  const [name, setName] = useState("");
  const [score, setScore] = useState();

  const [userData, setUserData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const firestore = fire.database().ref("/UserInfo");
    let data = { FirstName: name, Score: score };

    firestore.push(data);
  };

  useEffect(() => {
    const firestore = fire.database().ref("/UserInfo");
    firestore.on("value", (response) => {
      const data = response.val();
      let userInfo = [];
      for (let id in data) {
        userInfo.push({
          id: id,
          name: data[id].FirstName,
          score: data[id].Score,
        });
      }
      setUserData(userInfo);
    });
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleScore = (e) => {
    setScore(e.target.value);
  };

  const userName = userData.map((item) => {
    return <li key={item.id}>{item.name}</li>;
  });
  const userScore = userData.map((item) => {
    return <li key={item.id}>{item.score}</li>;
  });

  return (
    <div>
      <div className="table__wrapper">
        <ul>
          <li>Name:</li>
          <li>{userName}</li>
        </ul>
        <ul>
          <li>Score:</li>

          <li>{userScore}</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleName}
          name="firstName"
          value={name}
        />
        <input
          type="number"
          onChange={handleScore}
          name="score"
          value={score}
        />
        <input type="submit" />
      </form>

      <button onClick={() => console.log(userData)}>Loggg</button>
    </div>
  );
};

export default Table;
