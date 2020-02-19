import { Dispatch } from 'redux';
import { actions } from '../constants';
import { getAllUsers } from '../services/api';
import { push } from 'connected-react-router';

function getUserList(limit: number, page: number) {
  console.log('sdsdfewfsdwefw');

  return (dispatch: Dispatch) => {
    dispatch({ type: actions.WAIT_FOR_RESPONSE });
    return getAllUsers(limit, page)
      .then((result: any) => {
        console.log('rerere', result);

        dispatch({
          type: actions.SET_USERS_DATA,
          payload: result.data.result
        });
      })
      .catch((error: any) => {
        let errorMsg = {
          state: true,
          type: 2,
          msg: ''
        };
        if (error.response) {
          switch (error.response.status) {
            case 401:
              dispatch({
                type: actions.LOGOUT
              });
              dispatch(push('/login'));
              break;
            case 500:
              errorMsg.msg = 'Server does not respond.';
              dispatch({ type: actions.REQUEST_ERROR, payload: errorMsg });
              break;
            default:
              errorMsg.msg = error.response.statusText;
              dispatch({ type: actions.REQUEST_ERROR, payload: errorMsg });
              break;
          }
        }
      });
  };
}

export default {
  getUserList
};
