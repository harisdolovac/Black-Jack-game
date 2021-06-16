/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import fire from "../fire";
import { useHistory } from "react-router-dom";

import SignIn from "./SignIn";

import "../Css/Registration.css";

const Registration = ({ amount }) => {
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  let history = useHistory();

  const clearInputs = () => {
    setEmail("");
    setPasswordError("");
  };

  const clearErrors = () => {
    setPasswordError("");
    setEmailError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    clearErrors();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)

      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            setEmailError(err.message);
            break;
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        history.push("/");
        user.updateProfile({
          displayName: userName,
        });
      }
    });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        fire
          .database()
          .ref("UserInfo/" + user.uid)
          .set({
            FirstName: user.displayName,
            Score: amount,
          });
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, [amount]);

  return (
    <div className="registration__wrapper">
      {user ? (
        <div>
          <h3>
            You are sign in as: <h2>{user.displayName}</h2>
            <h3>
              With email:<h2>{user.email}</h2> If this is not your
              account,please log out
            </h3>
          </h3>
          <button onClick={() => handleLogout()}>Log out</button>
        </div>
      ) : (
        <SignIn
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          setUserName={setUserName}
          userName={userName}
        />
      )}
    </div>
  );
};

export default Registration;
