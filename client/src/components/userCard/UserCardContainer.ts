import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import UserCard from './UserCard'

const mapStateToProps = (state: any) => {
  return {
    mainUser: state.user.userInfo
  }
}

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   const { openModal } = modal
//   return bindActionCreators({ openModal }, dispatch)
// }

const UserCardContainer = connect(mapStateToProps, null)(UserCard)

export default UserCardContainer
