import { applyMiddleware, compose, createStore } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // or whatever storage you are using

const config = {
  key: 'root',
  storage
}

const reducer = persistCombineReducers(config, reducers)

const store = createStore(
  reducer,
  undefined,
  compose(applyMiddleware(...[thunk]))
)

export default store
