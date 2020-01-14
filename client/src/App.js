import React, { useState, useEffect, useContext } from "react";
import dotenv from "dotenv";

// import Cookies from "js-cookie";
// import { useCookies } from "react-cookie";
import Main from "./components/main/main";
import LoginPage from "./components/logIn/login";
import SingupPage from "./components/signUp/signup";
import { getLocalUser } from "./services/localStorage";
import { UserContext } from "./components/usersPage/userContext";

// import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
dotenv.config();
const isLogined = getLocalUser();

export default function App() {
  const [user, setUser] = useState(isLogined);
  return (
    <UserContext.Provider value={{ user, setUser }}>
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
    </UserContext.Provider>
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
