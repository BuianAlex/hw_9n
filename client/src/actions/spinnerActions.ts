import { actions } from '../constants';
import { Dispatch } from 'redux';

const showSpiner = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.SPINNER_ON
    });
  };
};

const hideSpiner = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.SPINNER_OFF
    });
  };
};

export default { showSpiner, hideSpiner };
