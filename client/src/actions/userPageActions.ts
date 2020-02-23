import { Dispatch } from 'redux';
import { actions } from '../constants';
import { getAllUsers, deleteUser, usersStats } from '../services/api';
import { push } from 'connected-react-router';
import { store } from './../services/reduxStor';

function actionGetUsersList(limit: number, page: number) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.WAIT_FOR_RESPONSE });
    return getAllUsers(limit, page)
      .then((res: any) => {
        const { result } = res.data;
        console.log(result.pages);

        const { usersPage } = store.getState();
        if (result.usersList.length === 0) {
          if (result.pages === 1) {
            console.log('cccc');
            dispatch<any>(actionSetPage(1));
          } else {
            dispatch<any>(actionSetPage(usersPage.tablePage - 1));
          }
        } else {
          dispatch({
            type: actions.SET_USERS_DATA,
            payload: result
          });
        }
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
    dispatch({ type: actions.USERS_TABLE_SELECT_ROW, payload: id });
  };
}

function actionDeleteUser(listToDelete: number[]) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.WAIT_FOR_RESPONSE });
    return deleteUser(listToDelete) //
      .then((result: any) => {
        const { usersPage } = store.getState();
        dispatch({ type: actions.USERS_TABLE_CLEAR_SELECT_LIST });
        dispatch<any>(
          actionGetUsersList(usersPage.tableSize, usersPage.tablePage)
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

function actionCreateNewUser() {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.CREATE_NEW_USER });
    return;
  };
}

function actionEditUser(userData: object) {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.EDIT_USER, payload: userData });
  };
}

function actionSetTableSize(size: string) {
  const sizeInt = parseInt(size, 10);
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.USERS_TABLE_SIZE,
      payload: sizeInt
    });
    dispatch({
      type: actions.USERS_TABLE_PAGE,
      payload: 1
    });
    const { usersPage } = store.getState();
    dispatch<any>(actionGetUsersList(sizeInt, usersPage.tablePage));
  };
}

function actionSetPage(page: number) {
  const { usersPage } = store.getState();
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.USERS_TABLE_PAGE,
      payload: page
    });
    dispatch<any>(actionGetUsersList(usersPage.tableSize, page));
  };
}

interface ICountry {
  calc: number;
  country: { [key: string]: string };
}

interface IMajority {
  [key: string]: number;
}

function actionsGetStats() {
  return (dispatch: Dispatch) => {
    dispatch({ type: actions.USERS_STATS_REQUEST });
    return usersStats()
      .then(res => {
        const { countries } = res.data;
        let other = { calc: 0, country: {} } as ICountry;
        let majority = {} as IMajority;
        Object.keys(countries).forEach(item => {
          if (countries[item] < 3) {
            other.country[item] = countries[item];
            other.calc += countries[item];
          } else {
            majority[item] = countries[item];
          }
        });
        majority['other < 3'] = other.calc;
        res.data.countries = majority;
        dispatch({
          type: actions.USERS_STATS_SHOW,
          payload: res.data
        });
      })
      .catch(error => {
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
              dispatch({
                type: actions.USERS_STATS_SHOW_ERROR,
                payload: errorMsg
              });
              break;
            default:
              errorMsg.msg = error.response.statusText;
              dispatch({
                type: actions.USERS_STATS_SHOW_ERROR,
                payload: errorMsg
              });
              break;
          }
        }
      });
  };
}

export default {
  actionGetUsersList,
  actionSelectRow,
  actionDeleteUser,
  actionCreateNewUser,
  actionEditUser,
  actionsGetStats,
  actionSetTableSize,
  actionSetPage
};
