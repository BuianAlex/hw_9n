import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import LoginPage from './LoginPage';
import { loginUser } from '../../services/api';
import { useHistory } from 'react-router-dom';
import { user } from '../../actions';

interface IUserData {
  login: string;
  password: string;
}

const loginRequest = (userData: IUserData) => {
  const { userLogIn, saveUserInfo } = user;
  //TODO: show spinner
  const { login: loginName, password } = userData;
  return function(dispatch: Dispatch) {
    return loginUser({ loginName, password })
      .then((result: any) => {
        saveUserInfo({ name: 'sdsdsds' })(dispatch);
        userLogIn()(dispatch);
        console.log(result);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const mapStateToProps = (state: any) => {
    return {
      tableSize: parseInt(state.select.tableSize.limit, 10)
    };
  };

  // e.preventDefault()
  // setSpinerState(true)
  // const servRes = await loginUser({ loginName: login, password: password })
  // if (servRes.result) {
  //   // setSpinerState(false)
  //   history.push('/')
  // } else {
  //   setSpinerState(false)
  //   setFormMessage({ msg: servRes.error, type: 2 })
  // }
};
const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ loginRequest }, dispatch);
};

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default LoginPageContainer;
