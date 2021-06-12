import React, { useState, useEffect } from "react";
import fire, { auth } from "../fire";

import SignIn from "./SignIn";
import Home from "../Home";

import "../Css/Registration.css";
import SignUp from "./SignUp";

const Registration = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    // setPasswordError("");
  };

  const clearErrors = () => {
    // setPasswordError("");
    // setEmailError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire.auth().signInWithEmailAndPassword(email, password);
    // .catch((err) => {
    //   switch (err.code) {
    //     case "auth/invalid-email":
    //     case "auth/user-disabled":
    //     case "auth/user-not-found":
    //       setEmailError(err.message);
    //       break;
    //     case "auth/wrong-password":
    //       setPasswordError(err.message);
    //       break;
    //   }
    // });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    clearErrors();

    console.log(email, password, user);
    fire.auth().createUserWithEmailAndPassword(email, password);

    // .catch((err) => {
    //   switch (err.code) {
    //     case "auth/email-alredy-in-use":
    //     case "auth/invalid-email":
    //       setEmailError(err.message);
    //       break;
    //     case "auth/weak-password":
    //       setPasswordError(err.message);
    //       break;
    //   }
    // });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="registration__wrapper">
      {user ? (
        <div>
          <button onClick={() => handleLogout()}>log iut</button>
          <button onClick={() => console.log("treba usera da pojavim", user)}>
            log usera
          </button>
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
          // emailError={emailError}
          // passwordError={passwordError}
          setUserName={setUserName}
          userName={userName}
        />
      )}
      {/* <SignUp /> */}
    </div>
  );
};

export default Registration;
