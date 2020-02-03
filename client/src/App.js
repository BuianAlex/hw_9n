import React, { useState } from 'react'
import dotenv from 'dotenv'
import { Provider } from 'react-redux'
// import Cookies from "js-cookie";
// import { useCookies } from "react-cookie";
import Main from './components/Main'
import LoginPage from './components/logIn/login'
import SingupPage from './components/signUp/signup'
import { getLocalUser } from './services/localStorage'
import { UserContext } from './components/UsersPage/userContext'
import store from './services/reduxStor'
// import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
dotenv.config()
// const isLogined = getLocalUser()

export default function App() {
  const isLogined = getLocalUser()
  console.log('app')

  const [user, setUser] = useState(isLogined)
  return (
    <Provider store={store}>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Switch>
            <Route path='/login'>
              <LoginPage />
            </Route>
            <Route path='/signup'>
              <SingupPage />
            </Route>

            <PrivateRoute path='/'>
              <Main />
            </PrivateRoute>
          </Switch>
        </Router>
      </UserContext.Provider>
    </Provider>
  )
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('userData') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}
