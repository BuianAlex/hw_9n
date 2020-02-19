import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';

import User from '../UsersPage/UsersPageContainer';
import Stats from '../stats/statsPage';
import { userRole } from '../../constants';

import Modal from '../Modal';
import './MainPage.scss';
let currentUser;

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <h2 className='section-header'>Main page</h2>
  },
  {
    path: '/users',
    main: User
  },
  {
    path: '/posts',
    main: () => <h2 className='section-header'>Posts</h2>
  }
];

export default function Main(props) {
  const { mainUser, userLogOut } = props;
  currentUser = mainUser;

  return (
    <>
      <Modal />
      <Router>
        <div className='main'>
          <div className='side-bar'>
            <div className='user'>
              <img
                src={
                  currentUser.photo && currentUser.photo.length > 0
                    ? currentUser.photo[0].storePath +
                      currentUser.photo[0].fileName
                    : './img/user.svg'
                }
                alt='user'
                className='user-img'
              />
              <h4 className='user-welcome'>Hi, {currentUser.loginName}</h4>
              <p className='user-right'>
                You are <strong>{currentUser.usergroup}</strong>
              </p>
              <button onClick={userLogOut} className='user-logout'>
                Logout...
              </button>
            </div>

            <hr />

            <ul className='bar-nav'>
              <li>
                <NavLink activeClassName='active' exact to='/'>
                  Main page
                </NavLink>
              </li>

              <li>
                <NavLink activeClassName='active' exact to='/users'>
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName='active' exact to='/posts'>
                  Posts
                </NavLink>
              </li>
              {currentUser.usergroup === userRole.USER_ADMIN && (
                <li>
                  <NavLink to='/stats' exact activeClassName='active'>
                    APP stats
                  </NavLink>
                </li>
              )}
            </ul>
            <hr />
          </div>

          <div className='work-flow'>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              ))}
              <AdminPrivateRoute path='/stats'>
                <Stats />
              </AdminPrivateRoute>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

function AdminPrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser.usergroup === userRole.USER_ADMIN ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
