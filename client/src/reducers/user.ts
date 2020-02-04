import update from 'immutability-helper';
import { actions } from '../constants';

const initialState = {
  isLogined: false,
  userInfo: false
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.USER_IS_LOGINED:
      return update(state, {
        isLogined: { $set: true }
      });

    case actions.USER_IS_OUT:
      return update(state, {
        isLogined: { $set: false }
      });

    case actions.SET_USER_DATA:
      return update(state, {
        userInfo: { $set: action.payload }
      });

    default:
      return state;
  }
};
