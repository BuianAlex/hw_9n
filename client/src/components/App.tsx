import React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Main from './Main/MainPageContainer';
import LoginPage from './LoginPage/LoginPageCotainer';
import SingupPage from './SignUpPage/SignUpCotainer';
import { history } from './../services/reduxStor';

let isAuthenticated = false;
interface IAppProps {
  isLogined?: boolean;
}

const App: React.FC<IAppProps> = props => {
  const { isLogined } = props;
  isAuthenticated = isLogined || false;
  return (
    <ConnectedRouter history={history}>
      <>
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
      </>
    </ConnectedRouter>
  );
};

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
  );
};

export default App;
