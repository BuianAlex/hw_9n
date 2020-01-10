import React from "react";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import Main from "./components/main/main";
import LoginPage from "./components/logIn/login";
import SingupPage from "./components/signUp/signup";
import { getLocalUser } from "./services/localStorage";

import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const isLogined = getLocalUser() || false;

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SingupPage />
        </Route>

        <PrivateRoute path="/">
          <Main />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
