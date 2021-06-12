import React, { useState } from "react";
import fire from "../fire";

const SignInTest = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      });
  };

  return (
    <div>
      <h1>Log in</h1>
      <p>Hello</p>
      <form onSubmit={handleLogIn}>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignInTest;
