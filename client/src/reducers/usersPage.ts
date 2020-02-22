import update from 'immutability-helper';
import { actions } from '../constants';

interface IUserData {
  totalUsers: number;
  pages: number;
  usersList: [];
}

interface IUsewrCard {
  state: boolean;
  cardType: string;
  data: object;
}

const initialState = {
  isFormMsg: { state: false, type: 0, msg: '' },
  isWaitResponse: false as boolean,
  usersData: {} as IUserData,
  rowSelected: [] as number[],
  userCard: { state: false, cardType: 'create', data: {} } as IUsewrCard
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
        isWaitResponse: { $set: false },
        rowSelected: { $set: initialState.rowSelected }
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

    case actions.USER_TABLE_CLEAR_SELECT_LIST:
      return update(state, {
        rowSelected: { $set: initialState.rowSelected }
      });

    case actions.CREATE_NEW_USER:
      return update(state, {
        userCard: { $set: { state: true, cardType: 'create', data: {} } }
      });

    case actions.EDIT_USER:
      return update(state, {
        userCard: {
          $set: { state: true, cardType: 'edit', data: action.payload }
        }
      });

    case actions.USER_CARD_CLOSE:
      return update(state, {
        userCard: { $set: initialState.userCard }
      });

    default:
      return state;
  }
};
