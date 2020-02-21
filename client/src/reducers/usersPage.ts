import update from 'immutability-helper';
import { actions } from '../constants';

interface IUserData {
  totalUsers: number;
  pages: number;
  usersList: [];
}

const initialState = {
  isFormMsg: { state: false, type: 0, msg: '' },
  isWaitResponse: false as boolean,
  usersData: {} as IUserData,
  rowSelected: [] as number[]
};

function addToListSelected(id: number, selectedList: number[]): void {
  const arrKey = selectedList.indexOf(id);
  if (arrKey === -1) {
    selectedList.push(id);
  } else {
    selectedList.splice(arrKey, 1);
  }
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.WAIT_FOR_RESPONSE:
      return update(state, {
        isFormMsg: { $set: initialState.isFormMsg },
        isWaitResponse: { $set: true }
      });

    case actions.SET_USERS_DATA:
      return update(state, {
        usersData: { $set: action.payload },
        isFormMsg: { $set: initialState.isFormMsg },
        isWaitResponse: { $set: false }
      });

    case actions.REQUEST_ERROR:
      return update(state, {
        isFormMsg: { $set: action.payload },
        isWaitResponse: { $set: false }
      });

    case actions.USER_TABLE_SELECT_ROW:
      let selectedList = [...state.rowSelected];
      if (action.payload) {
        addToListSelected(action.payload, selectedList);
      } else {
        const { usersList } = state.usersData;
        usersList.forEach((element: { userId: number }) => {
          addToListSelected(element.userId, selectedList);
        });
      }
      return update(state, {
        rowSelected: { $set: selectedList }
      });

    default:
      return state;
  }
};
