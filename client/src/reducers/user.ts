import update from 'immutability-helper';
import { actions } from '../constants';

const initialState = {
  isLogined: false,
  userInfo: {},
  isLoginError: { state: false, type: 0, msg: '' },
  isWaitResponse: false
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.LOGIN:
      return update(state, {
        isLoginError: { $set: initialState.isLoginError },
        isWaitResponse: { $set: true }
      });

    case actions.LOGIN_SUCCESS:
      return update(state, {
        isLogined: { $set: true },
        userInfo: { $set: action.payload },
        isLoginError: { $set: initialState.isLoginError },
        isWaitResponse: { $set: initialState.isWaitResponse }
      });

    case actions.LOGOUT:
      return update(state, {
        isLogined: { $set: initialState.isLogined },
        userInfo: { $set: initialState.userInfo },
        isLoginError: { $set: initialState.isLoginError }
      });

    case actions.LOGIN_FAILURE:
      return update(state, {
        isLogined: { $set: initialState.isLogined },
        userInfo: { $set: initialState.userInfo },
        isLoginError: { $set: action.payload },
        isWaitResponse: { $set: initialState.isWaitResponse }
      });

    default:
      return state;
  }
};
