import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { userCardActions } from '../../actions';
import UserCard from './UserCard';

const mapStateToProps = (state: any) => {
  return {
    mainUser: state.user.userInfo, ///!!!
    isWaitResponse: state.userCard.isWaitResponse,
    isWaitPhotoUpload: state.userCard.isWaitPhotoUpload,
    isSaveRequestError: state.userCard.isSaveRequestError,
    isUploadError: state.userCard.isUploadError
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { actionCloseCard, actionSaveUser, actionEditUser } = userCardActions;
  return bindActionCreators(
    { actionCloseCard, actionSaveUser, actionEditUser },
    dispatch
  );
};

const UserCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCard);

export default UserCardContainer;
