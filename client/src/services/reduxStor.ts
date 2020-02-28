import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware, connectRouter } from 'connected-react-router';

export const history = createBrowserHistory();

const config = {
  key: 'root',
  storage,
  blacklist: ['user', 'spinner']
};

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['isFormMsg', 'isWaitResponse', 'isSignOk']
};

const { user, modal, usersPage, userCard } = reducers;
const rootReducer = combineReducers({
  router: connectRouter(history),
  modal: modal,
  usersPage,
  userCard,
  user: persistReducer(userPersistConfig, user)
});

const reducer = persistReducer(config, rootReducer);

export const store = createStore(
  reducer,
  undefined,
  compose(applyMiddleware(...[thunk, routerMiddleware(history)]))
);
