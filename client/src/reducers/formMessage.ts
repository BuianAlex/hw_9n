import update from 'immutability-helper'

import { actions } from '../constants'

const initialState = {
  messageState: false,
  messageType: 0,
  messsageText: ''
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.SHOW_FORM_MESSAGE:
      return update(state, {
        messageState: { $set: true },
        messageType: { $set: 2 },
        messsageText: { $set: action.payload.messageText }
      })

    case actions.HIDE_FORM_MESSAGE:
      return update(state, {
        messageState: { $set: false },
        messageType: { $set: 0 },
        messsageText: { $set: '' }
      })

    default:
      return state
  }
}
