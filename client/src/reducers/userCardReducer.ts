import update from 'immutability-helper';
import { actions } from '../constants';

const initialState = {
  isWaitResponse: false as boolean,
  isWaitPhotoUpload: false as boolean,
  isSaveRequestError: { state: false, type: 0, msg: '' },
  isUploadError: { state: false, false: 0, msg: '' }
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.USER_CARD_SUBMIT:
      return update(state, {
        isWaitResponse: { $set: true }
      });

    default:
      return state;
  }
};
