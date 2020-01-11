import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import User from "../users/workbench";
import { logoutUser } from "../../services/api";
import { UserContext } from "./../users/userContext";
import "./main.scss";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <h2>Stats</h2>
  },
  {
    path: "/users",
    main: User
  },
  {
    path: "/comments",
    main: () => <h2>comments</h2>
  }
];

export default function SidebarExample() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div className="side-bar">
          <div className="user">
            <img src={user.photo} alt="user" className="user-img" />
            <h4 className="user-welcome">Hi, {user.loginName}</h4>
            <p className="user-right">
              You have <strong>{user.usergroup}</strong> right
            </p>
            <button onClick={logoutUser} className="user-logout">
              Logout
            </button>
          </div>

          <hr />

          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <NavLink to="/" exact activeClassName="active">
                Stats
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/users">
                Users
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/comments">
                Comments
              </NavLink>
            </li>
            <li>
              <hr />
            </li>
          </ul>
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}
