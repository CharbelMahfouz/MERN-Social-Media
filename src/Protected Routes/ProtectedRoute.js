import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!user ? <RouteComponent {...routeProps} /> : <Redirect to={"/login"} />
      }
    />
  );
};

export default ProtectedRoute;
