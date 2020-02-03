import update from 'immutability-helper'

import { actions } from '../constants'

const initialState = {
  tableSize: {
    limit: 10
  }
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.USER_LIMIT:
      return update(state, {
        tableSize: {
          limit: { $set: action.payload }
        }
      })
    default:
      return state
  }
}