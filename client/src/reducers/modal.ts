import update from 'immutability-helper';
import { actions } from '../constants';

type IMainModal = {
  open: boolean;
  title: string;
  error: string;
  result: string;
};

const initialState = {
  mainModal: {
    open: false
  } as IMainModal
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return update(state, {
        mainModal: {
          open: { $set: true },
          title: { $set: action.payload.title },
          error: { $set: action.payload.error },
          result: { $set: action.payload.result }
        }
      });
    case actions.CLOSE_MODAL:
      return update(state, {
        mainModal: {
          open: { $set: false }
        }
      });
    default:
      return state;
  }
};
