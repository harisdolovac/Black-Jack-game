import React, { useState, useEffect } from "react";
import fire from "../fire";
import { v4 as uuidv4 } from "uuid";
import "./SignUpTest.css";
import SignInTest from "./SignInTest";

const SignUpTest = ({ amount, setUserData, userData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const prijavi = () => {
    fire.auth().createUserWithEmailAndPassword(email, password);
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("updejtovao sam");
        user.updateProfile({
          displayName: name,
        });
      } else {
        // No user is signed in.
        console.log("nema korisnika");
      }
    });
  }; // kad ukucamo email i password prijavi

  useEffect(() => {
    var user = fire.auth().currentUser; //kupi korisnika

    if (user != null) {
      fire
        .database()
        .ref("UserInfo/" + user.uid)
        .set({
          FirstName: user.displayName,
          Score: amount,
        });
    } //setuje korisnika

    const readData = fire.database().ref("/UserInfo");
    readData.on("value", (snapshot) => {
      const data = snapshot.val();

      // console.log(data);
      for (const key in data) {
        console.log(data[key]);
        setUserData((prevData) => [...prevData, data[key]]);
      }
    }); //cita iz baze
  }, [amount]);

  const logOut = () => {
    fire.auth().signOut();
  };

  const log = () => {
    var user = fire.auth().currentUser;
    console.log(user);
    console.log(userData);
  };

  // let sortUserData = userData.sort((a, b) => b.Score - a.Score); sortiranje
  const userName = userData.map((item) => {
    var user = fire.auth().currentUser;

    return (
      <ul
        className={
          user && user.displayName === item.FirstName ? "user__register" : ""
        }
        key={uuidv4()}
      >
        <li> ime: {item.FirstName}</li>
        <li>score: {item.Score}</li>
      </ul>
    );
  });

  return (
    <div>
      <button onClick={log}>Loggggggg</button>
      <br />
      <input
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <br />
      <br />

      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />

      <br />
      <br />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <br />

      <label>password</label>

      <button onClick={() => prijavi()}>Register</button>

      <button onClick={() => logOut()}>Log out</button>

      <div>{userName}</div>

      <SignInTest />
    </div>
  );
};

export default SignUpTest;
