import update from 'immutability-helper';
import { actions } from '../constants';

const initialState = {};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 1:
      return update(state, {});

    default:
      return state;
  }
};
