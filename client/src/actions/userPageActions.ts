import { Dispatch } from 'redux';
import { actions } from '../constants';
import { getAllUsers, deleteUser } from '../services/api';
import { push } from 'connected-react-router';
import { store } from './../services/reduxStor';
import { type } from 'os';

function actionGetUsersList(limit: number, page: number) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.WAIT_FOR_RESPONSE });
    return getAllUsers(limit, page)
      .then((result: any) => {
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

function actionSelectRow(id: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.USER_TABLE_SELECT_ROW, payload: id });
  };
}

function actionDeleteUser(listToDelete: number[]) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.WAIT_FOR_RESPONSE });
    return deleteUser(listToDelete) //
      .then((result: any) => {
        // TODO:
        dispatch({ type: actions.USER_TABLE_CLEAR_SELECT_LIST });
        const { select } = store.getState();
        dispatch<any>(actionGetUsersList(select.tableSize.limit, 1));
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
            case 403:
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

function actionCreateNewUser() {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.CREATE_NEW_USER });
  };
}

function actionEditUser(userData: object) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.EDIT_USER, payload: userData });
  };
}

export default {
  actionGetUsersList,
  actionSelectRow,
  actionDeleteUser,
  actionCreateNewUser,
  actionEditUser
};
