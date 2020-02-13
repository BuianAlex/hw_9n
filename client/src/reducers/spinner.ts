import update from 'immutability-helper';
import { actions } from '../constants';

const initialState = {
  spinnerState: false
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.SPINNER_ON:
      return update(state, {
        spinnerState: { $set: true }
      });
    case actions.SPINNER_OFF:
      return update(state, {
        spinnerState: { $set: false }
      });

    default:
      return state;
  }
};
