import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

import { store } from './services/reduxStor';
import AppContainer from './components/AppContainer';
import * as serviceWorker from './serviceWorker';

persistStore(store, null, () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('root')
  );
});

serviceWorker.unregister();
