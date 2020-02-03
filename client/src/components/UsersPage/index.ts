import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { sendCsv } from '../../services/api'

import UsersPage from './UsersPage'
import { modal } from '../../actions'
import { select } from '../../actions'

function sendUsersCsv(file: HTMLInputElement & EventTarget) {
  const { openModal } = modal
  return function(dispatch: Dispatch) {
    return sendCsv(file)
      .then((result: any) => {
        console.log(result)

        dispatch(
          openModal({ title: 'ADD from csv', result: result.data.result })
        )
      })
      .catch((error: any) => {
        console.log(error.response)

        if (error.response && error.response.status < 500) {
          dispatch(
            openModal({
              title: 'ADD from csv',
              error: error.response.statusText
            })
          )
        } else {
          dispatch(
            openModal({
              title: 'ADD from csv',
              error: 'Server does not respond.'
            })
          )
        }
      })
  }
}
const mapStateToProps = (state: any) => {
  return {
    tableSize: parseInt(state.select.tableSize.limit, 10)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { setTableSize } = select
  const { openModal } = modal
  return bindActionCreators({ openModal, sendUsersCsv, setTableSize }, dispatch)
}

const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage)

export default MainPageContainer