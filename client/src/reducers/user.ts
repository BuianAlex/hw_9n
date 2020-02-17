import update from 'immutability-helper';
import { actions } from '../constants';

const initialState = {
  isLogined: false,
  userInfo: {},
  isFormMsg: { state: false, type: 0, msg: '' },
  isWaitResponse: false
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.LOGIN:
      return update(state, {
        isFormMsg: { $set: initialState.isFormMsg },
        isWaitResponse: { $set: true }
      });

    case actions.LOGIN_SUCCESS:
      return update(state, {
        isLogined: { $set: true },
        userInfo: { $set: action.payload },
        isFormMsg: { $set: initialState.isFormMsg },
        isWaitResponse: { $set: initialState.isWaitResponse }
      });

    case actions.LOGOUT:
      return update(state, {
        isLogined: { $set: initialState.isLogined },
        userInfo: { $set: initialState.userInfo },
        isFormMsg: { $set: initialState.isFormMsg }
      });

    case actions.LOGIN_FAILURE:
      return update(state, {
        isLogined: { $set: initialState.isLogined },
        userInfo: { $set: initialState.userInfo },
        isFormMsg: { $set: action.payload },
        isWaitResponse: { $set: initialState.isWaitResponse }
      });

    case actions.SIGNUP:
      return update(state, {
        isFormMsg: { $set: initialState.isFormMsg },
        isWaitResponse: { $set: true }
      });

    case actions.SIGNUP_SUCCESS:
      return update(state, {
        isFormMsg: { $set: action.payload },
        isWaitResponse: { $set: false }
      });

    case actions.SIGNUP_REDIRECT:
      return update(state, {
        isFormMsg: { $set: initialState.isFormMsg }
      });

    default:
      return state;
  }
};
