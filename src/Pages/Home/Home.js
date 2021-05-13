import React, { useEffect } from "react";
import Navbar from "../../components/Home Components/Navbar/Navbar";
import "./Home.css";
import UserInfo from "../../components/Home Components/UserInfo/UserInfo";
import Feed from "../../components/Home Components/Feed/Feed";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../../actions/constants/actionTypes";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decodedToken = decode(JSON.parse(localStorage.getItem("token")));

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: LOGOUT });
        history.push("/login");
      }
    }
  }, [dispatch, history]);

  return (
    <section className="home">
      <Navbar />
      <div className="container">
        <div className="home__components">
          <UserInfo />
          <Feed />
        </div>
      </div>
    </section>
  );
};

export default withRouter(Home);
