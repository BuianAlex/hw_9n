import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import User from "../usersPage/workbench";
import Stats from "../stats/stats";
import { logoutUser } from "../../services/api";
import { UserContext } from "../usersPage/userContext";
import "./main.scss";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <h2 className="section-header">Main page</h2>
  },
  {
    path: "/users",
    main: User
  },
  {
    path: "/posts",
    main: () => <h2 className="section-header">Posts</h2>
  }
];

export default function Main() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <div className="main">
        <div className="side-bar">
          <div className="user">
            <img src={user.photo} alt="user" className="user-img" />
            <h4 className="user-welcome">Hi, {user.loginName}</h4>
            <p className="user-right">
              You have <strong>{user.usergroup}</strong> right
            </p>
            <button onClick={logoutUser} className="user-logout">
              Logout...
            </button>
          </div>

          <hr />

          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <NavLink activeClassName="active" exact to="/">
                Main page
              </NavLink>
            </li>

            <li>
              <NavLink activeClassName="active" exact to="/users">
                Users
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/comments">
                Posts
              </NavLink>
            </li>
            {user.usergroup === process.env.REACT_APP_USER_ADMIN && (
              <li>
                <NavLink to="/stats" exact activeClassName="active">
                  APP stats
                </NavLink>
              </li>
            )}
          </ul>
          <hr />
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
            <AdminPrivateRoute path="/stats">
              <Stats />
            </AdminPrivateRoute>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function AdminPrivateRoute({ children, ...rest }) {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.usergroup === process.env.REACT_APP_USER_ADMIN ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
