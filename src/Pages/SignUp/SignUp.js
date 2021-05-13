import React from "react";
import "./SignUp.css";
import SignUpForm from "../../components/Sign Up Components/SIgnUpForm/SignUpForm";

const SignUp = () => {
  return (
    <section className="signup">
      <div className="signup__welcome">
        <h1>Join iSocialize</h1>
        <img src="images/welcome.svg" alt="" />
      </div>
      <div className="signup__right">
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUp;
