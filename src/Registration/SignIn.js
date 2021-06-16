import React from "react";
import "../Css/Signin.css";

const SignIn = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleSignUp,
  hasAccount,
  setHasAccount,
  emailError,
  passwordError,
  setUserName,
  userName,
}) => {
  return (
    <div className="form__signin">
      <form>
        <div className={hasAccount ? "hidden" : ""}>
          <label>Username</label>
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter Username"
          />
        </div>

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <p className="errorMsg">{emailError}</p>

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <p className="errorMsg">{passwordError}</p>

        {hasAccount ? (
          <div>
            <button onClick={handleLogin}>Sign in</button>
            <p>
              Don't have an account ?
              <span
                onClick={() => setHasAccount(!hasAccount)}
                className="hasAccount__signin"
              >
                Sign up
              </span>
            </p>
          </div>
        ) : (
          <div>
            <button onClick={handleSignUp}>Sign up</button>
            <p>
              Allredy have an account ?
              <span
                onClick={() => setHasAccount(!hasAccount)}
                className="hasAccount__signin"
              >
                Sign in
              </span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignIn;
