import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import LoginPage from './LoginPage';
import { userLogIn } from '../../actions/userAction';
import { IFormMessage } from './LoginPageInterfaces';

const mapStateToProps = (state: any) => {
  return {
    isLogined: state.user.isLogined as boolean,
    isWaitResponse: state.user.isWaitResponse as boolean,
    formMessage: state.user.isFormMsg as IFormMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators({ userLogIn }, dispatch)
  };
};

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default LoginPageContainer;
