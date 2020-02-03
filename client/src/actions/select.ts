import { Dispatch } from 'redux'
import { actions } from '../constants'

const setTableSize = (payload: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.USER_LIMIT,
      payload
    })
  }
}

export default { setTableSize }
