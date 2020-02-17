import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import SignUp from './SignUp';
import { userSignUp } from '../../actions/userAction';

export interface IFormMessage {
  state: boolean;
  type?: number;
  msg?: string;
}

const mapStateToProps = (state: any) => {
  return {
    isLogined: state.user.isLogined as boolean,
    isWaitResponse: state.user.isWaitResponse as boolean,
    formMessage: state.user.isFormMsg as IFormMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators({ userSignUp }, dispatch)
  };
};

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpContainer;
