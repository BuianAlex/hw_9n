import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import UsersPage from './UsersPage';
import { modalActions, userPageActions } from '../../actions';

const mapStateToProps = (state: any) => {
  return {
    isWaitResponse: state.usersPage.isWaitResponse,
    mainUser: state.user.userInfo,
    formMessage: state.usersPage.isFormMsg,
    usersData: state.usersPage.usersData,
    rowSelected: state.usersPage.rowSelected,
    userCard: state.usersPage.userCard,
    isWaitSatsResponse: state.usersPage.isWaitSatsResponse,
    statData: state.usersPage.statData,
    isStatsRequestError: state.usersPage.isStatsRequestError,
    tableSize: state.usersPage.tableSize,
    tablePage: state.usersPage.tablePage
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const {
    actionGetUsersList,
    actionSelectRow,
    actionDeleteUser,
    actionCreateNewUser,
    actionEditUser,
    actionsGetStats,
    actionSetTableSize,
    actionSetPage,
    actionImportCSV
  } = userPageActions;
  const { openModal } = modalActions;
  return bindActionCreators(
    {
      openModal,
      actionGetUsersList,
      actionSelectRow,
      actionDeleteUser,
      actionCreateNewUser,
      actionEditUser,
      actionsGetStats,
      actionSetTableSize,
      actionSetPage,
      actionImportCSV
    },
    dispatch
  );
};

const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);

export default MainPageContainer;
