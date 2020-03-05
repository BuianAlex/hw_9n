import update from 'immutability-helper';
import { actions, userCardType } from '../constants';

const initialState = {
  isWaitResponse: false as boolean,
  isWaitPhotoUpload: false as boolean,
  isSaveRequestError: { state: false, type: 0, msg: '' },
  isUploadError: { state: false, false: 0, msg: '' },
  userPhoto: { storePath: '/img/', fileName: 'user.svg' },
  userData: {},
  cardType: userCardType.CARD_CREATE
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.USER_CARD_SUBMIT:
      return update(state, {
        isWaitResponse: { $set: true }
      });

    case actions.USER_CARD_SAVED:
      return update(state, {
        isWaitResponse: { $set: false },
        isSaveRequestError: { $set: initialState.isSaveRequestError }
      });

    case actions.USER_CARD_SAVE_ERROR:
      return update(state, {
        isWaitResponse: { $set: false },
        isSaveRequestError: { $set: action.payload }
      });

    case actions.USER_CARD_UPLOAD_PHOTO:
      return update(state, {
        isWaitPhotoUpload: { $set: true }
      });

    case actions.USER_CARD_UPLOAD_PHOTO_ERROR:
      return update(state, {
        isWaitPhotoUpload: { $set: false },
        isUploadError: { $set: action.payload }
      });

    case actions.USER_CARD_UPLOAD_PHOTO_SUCCESS:
      return update(state, {
        isWaitPhotoUpload: { $set: false },
        isUploadError: { $set: initialState.isUploadError },
        userPhoto: {
          $set: {
            storePath: userCardType.UPLOAD_PATH,
            fileName: action.payload
          }
        }
      });

    case actions.USER_CARD_EDIT:
      return update(state, {
        userData: { $set: action.payload },
        cardType: { $set: userCardType.CARD_EDIT },
        userPhoto: {
          $set:
            action.payload.photo[0] !== undefined &&
            action.payload.photo.length > 0
              ? action.payload.photo[0]
              : initialState.userPhoto
        }
      });

    case actions.USER_CARD_CREATE:
      return update(state, {
        cardType: { $set: userCardType.CARD_CREATE },
        userData: { $set: initialState.userData },
        userPhoto: { $set: initialState.userPhoto }
      });

    case actions.USER_CARD_SET_DEFAULT:
      return update(state, {
        isWaitPhotoUpload: { $set: initialState.isWaitPhotoUpload },
        isUploadError: { $set: initialState.isUploadError },
        isWaitResponse: { $set: initialState.isWaitResponse },
        isSaveRequestError: { $set: initialState.isSaveRequestError },
        userPhoto: { $set: initialState.userPhoto }
      });

    default:
      return state;
  }
};
