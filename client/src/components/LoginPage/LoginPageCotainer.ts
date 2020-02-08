import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import LoginPage from './LoginPage'
import { loginUser } from '../../services/api'
import { user } from '../../actions'
import { formMessage } from '../../actions'

let waitResponse = false

const loginRequest = (loginName: string, password: string) => {
  const { userLogIn, saveUserInfo } = user
  const { showMessage, hideMessage } = formMessage
  waitResponse = true
  //TODO: show and hide spinner

  // const { login: loginName, password } = userData
  return function(dispatch: Dispatch) {
    console.log(loginName, password)

    hideMessage()(dispatch)
    return loginUser({ loginName, password })
      .then((result: any) => {
        waitResponse = false
        saveUserInfo(result.data.result)(dispatch)
        userLogIn()(dispatch)
      })
      .catch((error: any) => {
        waitResponse = false
        // TODO:show message with error
        if (error.response.status === 500) {
          showMessage({
            messageType: 2,
            messageText: 'Server does not respond.'
          })(dispatch)
        } else {
          showMessage({
            messageType: 2,
            messsageText: error.response.data.message
          })(dispatch)
          console.error(error.response.data.message)
        }
      })
  }
}

const mapStateToProps = (state: any) => {
  return {
    isWaitResponse: waitResponse,
    isLogined: state.user.isLogined,
    isFormMessage: state.formMessage.messageState,
    messageType: state.formMessage.messageType,
    messsageText: state.formMessage.messsageText
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loginRequest: function(log: string, pas: string) {
      // call of action in custom func
      loginRequest(log, pas)(dispatch)
    }
  }
}

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default LoginPageContainer
