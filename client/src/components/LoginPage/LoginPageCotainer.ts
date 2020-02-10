import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import LoginPage from './LoginPage';
import { userAction } from '../../actions';
import { IFormMessage } from './LoginPageInterfaces';

const mapStateToProps = (state: any) => {
  return {
    isLogined: state.user.isLogined as boolean,
    isWaitResponse: state.user.isWaitResponse as boolean,
    formMessage: state.user.isLoginError as IFormMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { userLogIn } = userAction;
  return {
    ...bindActionCreators({ userLogIn }, dispatch)
  };
};

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default LoginPageContainer;
