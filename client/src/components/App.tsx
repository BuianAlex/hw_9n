import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps
} from 'react-router-dom'
import Main from './Main/MainPageComtainer'
import LoginPage from './LoginPage/LoginPageCotainer'
import SingupPage from './signUp/signup'

let isAuthenticated = false
interface iApp {
  isLogined: boolean
}

const App: React.FC<iApp> = props => {
  const { isLogined } = props
  isAuthenticated = isLogined
  return (
    <div>
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
    </div>
  )
}

const PrivateRoute: React.SFC<RouteProps> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
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

export default App
