import { Dispatch } from 'redux'
import { actions } from '../constants'

const setTableSize = (payload: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.TABLE_SIZE,
      payload
    })
  }
}

export default { setTableSize }
