import { Dispatch } from 'redux';
import { actions } from '../constants';

const userLogIn = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.USER_IS_LOGINED
    });
  };
};

const userLogOut = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.USER_IS_OUT
    });
  };
};

interface ISetUser {
  name: string;
}

const saveUserInfo = (payload: ISetUser | boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.SET_USER_DATA,
      payload
    });
  };
};

export default { userLogIn, userLogOut, saveUserInfo };
