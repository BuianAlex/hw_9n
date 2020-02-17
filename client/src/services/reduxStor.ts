import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

const { user, modal, select, spinner } = reducers;
const rootReducer = combineReducers({
  modal: modal,
  select: select,
  spinner: spinner,
  user: persistReducer(userPersistConfig, user)
});

const reducer = persistReducer(config, rootReducer);

const store = createStore(
  reducer,
  undefined,
  compose(applyMiddleware(...[thunk]))
);

export default store;
