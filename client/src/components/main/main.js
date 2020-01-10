import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import User from "../users/workbench";
import { logoutUser } from "../../services/api";
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
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div className="side-bar">
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
              <button onClick={logoutUser} className="logout">
                Logout
              </button>
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
