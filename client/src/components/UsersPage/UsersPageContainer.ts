import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { sendCsv } from '../../services/api';

import UsersPage from './UsersPage';
import { modal, select, userPageActions } from '../../actions';

import { actions } from '../../constants';

function sendUsersCsv(file: HTMLInputElement & EventTarget) {
  const { openModal } = modal;
  return function(dispatch: Dispatch) {
    dispatch({ type: actions.SPINNER_ON });
    return sendCsv(file)
      .then((result: any) => {
        dispatch({ type: actions.SPINNER_OFF });
        dispatch(
          openModal({ title: 'ADD from csv', result: result.data.result })
        );
      })
      .catch((error: any) => {
        dispatch({ type: actions.SPINNER_OFF });
        if (error.response && error.response.status < 500) {
          dispatch(
            openModal({
              title: 'ADD from csv',
              error: error.response.statusText
            })
          );
        } else {
          dispatch(
            openModal({
              title: 'ADD from csv',
              error: 'Server does not respond.'
            })
          );
        }
      });
  };
}

const mapStateToProps = (state: any) => {
  console.log(state);

  return {
    isWaitResponse: state.usersPage.isWaitResponse,
    tableSize: parseInt(state.select.tableSize.limit, 10),
    mainUser: state.user.userInfo,
    formMessage: state.usersPage.isFormMsg,
    usersData: state.usersPage.usersData,
    rowSelected: state.usersPage.rowSelected
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { actionGetUsersList, actionSelectRow } = userPageActions;
  const { setTableSize } = select;
  const { openModal } = modal;
  return bindActionCreators(
    {
      openModal,
      sendUsersCsv,
      setTableSize,
      actionGetUsersList,
      actionSelectRow
    },
    dispatch
  );
};

const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);

export default MainPageContainer;
