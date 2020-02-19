import update from 'immutability-helper';
import { actions } from '../constants';

const initialState = {
  isFormMsg: { state: false, type: 0, msg: '' },
  isWaitResponse: false,
  usersData: []
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.WAIT_FOR_RESPONSE:
      return update(state, {
        isFormMsg: { $set: initialState.isFormMsg },
        isWaitResponse: { $set: true }
      });

    case actions.SET_USERS_DATA:
      console.log('dfd');
      return update(state, {
        usersData: { $set: action.payload },
        isFormMsg: { $set: initialState.isFormMsg },
        isWaitResponse: { $set: false }
      });

    case actions.REQUEST_ERROR:
      console.log('err');

      return update(state, {
        isFormMsg: { $set: action.payload },
        isWaitResponse: { $set: false }
      });

    default:
      return state;
  }
};
