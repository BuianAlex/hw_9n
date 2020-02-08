import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { logoutUser } from '../../services/api'
import MainPage from './MainPage'
import modal from '../../actions/modal'
import user from '../../actions/user'

const mapStateToProps = (state: any) => {
  return {
    mainUser: state.user.userInfo
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { userLogOut } = user
  const { openModal } = modal
  return bindActionCreators({ openModal, userLogOut }, dispatch)
}

const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage)

export default MainPageContainer
