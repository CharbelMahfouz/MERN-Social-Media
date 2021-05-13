import React from "react";
import LoginForm from "../../components/Login Components/LoginForm/LoginForm";
import "./Login.css";

const Login = () => {
  return (
    <section className="login">
      <div className="login__welcome">
        <h1>Login To iSocialize</h1>
        <img src="images/welcome.svg" alt="" />
      </div>
      <div className="login__right">
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
