import reducer, { initialState } from './user';
import { actions } from '../constants';

describe('Test user reducer', () => {
  it('login action', () => {
    const action = { type: actions.LOGIN };
    const state = reducer(initialState, action);
    expect(state).not.toBe(initialState);
    expect(state.isWaitResponse).toBe(true);
  });

  it('login success action', () => {
    const action = {
      type: actions.LOGIN_SUCCESS,
      payload: { loginName: 'test' }
    };
    const state = reducer(initialState, action);
    expect(state).not.toBe(initialState);
    expect(state.isLogined).toBe(true);
    expect(state.isWaitResponse).toBe(false);
    expect(state.isLoginError.state).toBe(false);
    expect(state.userInfo.loginName).toBe('test');
  });

  it('login failure action', () => {
    const action = {
      type: actions.LOGIN_FAILURE,
      payload: { state: true }
    };
    const state = reducer(initialState, action);
    expect(state).not.toBe(initialState);
    expect(state.isLogined).toBe(false);
    expect(state.userInfo.loginName).toBe(undefined);
    expect(state.isLoginError.state).toBe(true);
    expect(state.isWaitResponse).toBe(false);
  });

  it('logout action', () => {
    const action = { type: actions.LOGOUT };
    const state = reducer(initialState, action);
    expect(state).not.toBe(initialState);
    expect(state.isLogined).toBe(false);
    expect(state.isWaitResponse).toBe(false);
    expect(state.isLoginError.state).toBe(false);
    expect(state.userInfo.loginName).toBe(undefined);
  });
});
