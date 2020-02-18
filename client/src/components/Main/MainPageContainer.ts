import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import MainPage from './MainPage';
import modal from '../../actions/modal';
import { userLogOut } from '../../actions/userAction';

const mapStateToProps = (state: any) => {
  return {
    mainUser: state.user.userInfo //&&&&
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { openModal } = modal;
  return bindActionCreators({ openModal, userLogOut }, dispatch);
};

const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

export default MainPageContainer;
