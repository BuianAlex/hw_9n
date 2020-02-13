import { actions } from '../constants';
import { Dispatch } from 'redux';

const showSlider = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.SPINNER_ON
    });
  };
};

const hideSlider = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actions.SPINNER_OFF
    });
  };
};

export default { showSlider, hideSlider };
