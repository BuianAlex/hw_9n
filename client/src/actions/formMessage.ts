import { Dispatch } from 'redux'
import { actions } from '../constants'

const showMessage = (payload: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.SHOW_FORM_MESSAGE,
      payload
    })
  }
}

const hideMessage = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.HIDE_FORM_MESSAGE
    })
  }
}

export default {
  showMessage,
  hideMessage
}
