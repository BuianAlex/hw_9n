import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { userLogIn, userLogOut } from './userAction';
import { actions } from '../constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

jest.mock('../services/api', () => ({
  loginUser: ({ email, password }) => {
    if (email === '' || password === '') {
      return Promise.reject('error message');
    } else {
      return Promise.resolve({});
    }
  },
  logoutUser: () => {
    return Promise.resolve(true);
  }
}));

describe('login', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('login success action', () => {
    return store
      .dispatch(userLogIn('email@gmail.com', 'Password1234'))
      .then(() => {
        const executedActions = store.getActions();
        const expectActions = [
          { type: actions.LOGIN },
          { type: actions.LOGIN_SUCCESS, payload: {} }
        ];
        expect(executedActions).toEqual(expectActions);
      });
  });

  it('login reject action', () => {
    return store.dispatch(userLogIn('testik', '')).then(() => {
      const executedActions = store.getActions();
      const expectActions = [
        { type: actions.LOGIN },
        {
          type: actions.LOGIN_FAILURE,
          payload: {
            msg: 'error message',
            state: true,
            type: 2
          }
        }
      ];
      expect(executedActions).toEqual(expectActions);
    });
  });
});

describe('Log out', () => {
  it('log out user', () => {
    return store.dispatch(userLogOut()).then(() => {
      const executedActions = store.getActions();
      const expectActions = [{ type: actions.LOGOUT }];
      expect(executedActions).toEqual(expectActions);
    });
  });
});
