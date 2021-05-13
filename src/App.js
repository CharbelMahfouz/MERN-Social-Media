import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "react-fullscreen-loading";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import SignUp from "./Pages/SignUp/SignUp";
import ProtectedRoute from "./Protected Routes/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";
import Pusher from "pusher-js";
import { stopLoading } from "./actions/loading";
import { GET_NEW_POST, DELETE } from "./actions/constants/actionTypes";
import { useEffect } from "react";

function App() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const pusher = new Pusher("99cb4e3efb0939509ef1", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("postmessages");
    channel.bind("inserted", (data) => {
      dispatch({ type: GET_NEW_POST, payload: data });
      dispatch(stopLoading());
    });
    channel.bind("deleted", (data) => {
      dispatch({ type: DELETE, payload: data });
    });
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          transition={Slide}
        />
        <Loading loading={loading.loading} loaderColor="#6200ee" />
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />

            <ProtectedRoute path="/user/:id" exact component={Profile} />
            <ProtectedRoute path="/" exact component={Home} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
