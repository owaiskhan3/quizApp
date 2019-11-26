import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return localStorage.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}

export default PrivateRoute;
