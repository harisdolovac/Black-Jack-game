import React from "react";

const SignIn = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleSignUp,
  hasAccount,
  setHasAccount,
  // emailError,
  // passwordError,
  setUserName,
  userName,
}) => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input
            type="name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          {/* <p>{emailError}</p> */}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          {/* <p>{passwordError}</p> */}
        </div>
        {hasAccount ? (
          <div>
            <button onClick={handleLogin}>Sign in</button>
            <p>
              Don't have an account ?
              <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
            </p>
          </div>
        ) : (
          <div>
            <button onClick={handleSignUp}>Sign up</button>
            <p>
              Allredy have an account ?
              <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignIn;
