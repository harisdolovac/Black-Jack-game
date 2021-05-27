import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import "../Css/Registration.css";

const Registration = () => {
  return (
    <div className="registration__wrapper">
      <SignUp />
      <SignIn />
    </div>
  );
};

export default Registration;
