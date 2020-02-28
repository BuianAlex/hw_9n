import { Dispatch } from 'redux';
import { actions } from '../constants';
import { updateUser, createUser } from '../services/api';
import { push } from 'connected-react-router';
import { store } from './../services/reduxStor';
import pageAction from './userPageActions';

const { usersPage } = store.getState();

function actionCloseCard() {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.USER_CARD_CLOSE });
  };
}

function actionSaveUser(newData: any) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.USER_CARD_SUBMIT });
    return createUser(newData)
      .then(res => {
        dispatch<any>(
          pageAction.actionGetUsersList(
            usersPage.tableSize,
            usersPage.tablePage
          )
        );
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

function actionEditUser(userID: string, newData: any) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.USER_CARD_SUBMIT });
    return updateUser(userID, newData)
      .then(res => {
        dispatch<any>(
          pageAction.actionGetUsersList(
            usersPage.tableSize,
            usersPage.tablePage
          )
        );
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

export default {
  actionCloseCard,
  actionSaveUser,
  actionEditUser
};
