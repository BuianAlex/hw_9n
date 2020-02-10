import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { actions } from '../constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe('login', () => {
  // afterEach(() => {
  //   store.clearActions();
  // });
  // it('failure response', () => {
  //   jest.mock('../services/api', () => ({
  //     post: jest.fn(() => Promise.reject({}))
  //   }));
  //   store.dispatch(userLogIn('test@test.com', 'Testpass1234')).then(() => {
  //     const actions = store.getActions();
  //     const expectedActions = [
  //       { type: actions.LOGIN },
  //       { type: actions.LOGIN_FAILURE }
  //     ];
  //     expect(actions).toEqual(expectedActions);
  //   });
  // });
  // it('success response', () => {
  //   jest.mock('../services/api', () => ({
  //     post: jest.fn(() =>
  //       Promise.resolve({
  //         name: 'Fred Cox',
  //         categories: [2, 12, 10, 9]
  //       })
  //     )
  //   }));
  //   store.dispatch(login('test@test.com', 'Testpass1234')).then(() => {
  //     const actions = store.getActions();
  //     const expectedResponse = {
  //       name: 'Fred Cox',
  //       categories: [2, 9, 10, 12]
  //     };
  //     const expectedActions = [
  //       { type: LOGIN },
  //       { type: LOGIN_SUCCESS, payload: expectedResponse }
  //     ];
  //     expect(actions).toEqual(expectedActions);
  //   });
  // });
});
