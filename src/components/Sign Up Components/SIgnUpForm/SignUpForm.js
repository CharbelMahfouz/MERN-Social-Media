import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../../actions/auth";
import "./SignUpForm.css";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUp(formData, history));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup__form">
      <form onSubmit={handleSignUp}>
        <div className="form__top">
          <p>Already Have an Account?</p>
          <Link to="/login">Login</Link>
        </div>
        <div className="form__control">
          <input
            name="fullName"
            type="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
        </div>
        <div className="form__control">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="form__control">
          <input
            name="confirmPassword"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className="form__control">
          <input
            name="password"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        </div>
        <button
          className="form__btn"
          disabled={
            formData.fullName === "" ||
            formData.email === "" ||
            formData.password === "" ||
            formData.confirmPassword === ""
          }
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
