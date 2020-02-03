import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import Modal from './Modal'
import { modal } from '../../actions'

const mapStateToProps = (state: any) => {
  return {
    mainModal: state.modal.mainModal
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { closeModal } = modal
  return bindActionCreators({ closeModal }, dispatch)
}

const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(Modal)

export default ModalContainer
