import { Dispatch } from 'redux';
import { actions } from '../constants';
import { loginUser, logoutUser, createUser } from '../services/api';

export function userLogIn(loginName: string, password: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.LOGIN });
    return loginUser({ loginName, password })
      .then((result: any) => {
        dispatch({ type: actions.LOGIN_SUCCESS, payload: result });
      })
      .catch((error: any) => {
        let errorMsg = { state: true, type: 2, msg: error };
        dispatch({ type: actions.LOGIN_FAILURE, payload: errorMsg });
      });
  };
}

export function userLogOut() {
  return (dispatch: Dispatch) => {
    return logoutUser()
      .then((result: any) => {
        dispatch({
          type: actions.LOGOUT
        });
      })
      .catch((error: any) => {
        return error;
      });
  };
}

type TCreateUser = {
  loginName: string;
  password: string;
  email: string;
  phone: string;
};

export function userSignUp(userData: TCreateUser) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.SIGNUP });
    return createUser(userData)
      .then((result: any) => {
        let msg = { state: true, type: 0, msg: 'Signup success' };
        dispatch({ type: actions.SIGNUP_SUCCESS, payload: msg });
        setTimeout(() => {
          dispatch({ type: actions.SIGNUP_REDIRECT, payload: true });
        }, 2000);
      })
      .catch((error: any) => {
        let errorMsg = { state: true, type: 2, msg: error };
        dispatch({ type: actions.LOGIN_FAILURE, payload: errorMsg });
      });
  };
}
