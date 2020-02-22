import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { userCardActions } from '../../actions';
import UserCard from './UserCard';

const mapStateToProps = (state: any) => {
  return {
    mainUser: state.user.userInfo ///!!!
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { actionCardClose, actionUserSave } = userCardActions;
  return bindActionCreators({ actionCardClose, actionUserSave }, dispatch);
};

const UserCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCard);

export default UserCardContainer;
