import React from "react";
import "./sign-in-sign-up.scss";
import SignIn from "../../components/sign-in/sign-in.jsx";
import SignUp from "../../components/sign-up/sign-up.jsx";

const SignInAndSignUpPage = () => (
  <div className="sign-in-sign-up">
    <SignIn></SignIn>
    <SignUp></SignUp>
  </div>
);

export default SignInAndSignUpPage;
