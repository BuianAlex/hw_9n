import { Dispatch } from 'redux';
import { actions } from '../constants';
import { getAllUsers, deleteUser } from '../services/api';
import { push } from 'connected-react-router';
import { store } from './../services/reduxStor';
import pageAction from './userPageActions';

const { usersPage } = store.getState();

function actionCardClose() {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.USER_CARD_CLOSE });
  };
}
// TODO
function actionUserSave() {
  return (dispatch: Dispatch) => {
    dispatch<any>(pageAction.actionGetUsersList(usersPage.tableSize, 1));
  };
}

export default {
  actionCardClose,
  actionUserSave
};
