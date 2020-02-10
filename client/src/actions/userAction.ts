import { Dispatch } from 'redux';
import { actions } from '../constants';
import { loginUser } from '../services/api';

interface IFormMessage {
  state?: boolean;
  type?: number;
  msg?: string;
}

const userLogIn = (loginName: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.LOGIN, payload: 'result' });
    return loginUser({ loginName, password })
      .then((result: any) => {
        dispatch({ type: actions.LOGIN_SUCCESS, payload: result.data.result });
      })
      .catch((error: any) => {
        let errorMsg: IFormMessage = {};
        if (error.response.status === 500) {
          errorMsg = { state: true, type: 2, msg: 'Server does not respond.' };
        } else {
          errorMsg = { state: true, type: 2, msg: error.response.data.message };
        }
        dispatch({ type: actions.LOGIN_FAILURE, payload: errorMsg });
      });
  };
};

const userLogOut = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.LOGOUT
    });
  };
};

// interface ISetUser {
//   name: string;
// }

// const saveUserInfo = (payload: ISetUser | boolean) => {
//   return (dispatch: Dispatch) => {
//     dispatch({
//       type: actions.SET_USER_DATA,
//       payload
//     });
//   };
// };

export default { userLogIn, userLogOut };
