import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../../actions/auth";
import "./LoginForm.css";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signIn(formData, history));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login__form">
      <form onSubmit={handleSignIn}>
        <div className="form__top">
          <p>Don't have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className="form__control">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form__control">
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
          />
        </div>
        <button
          className="form__btn"
          disabled={formData.email === "" || formData.password === ""}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
