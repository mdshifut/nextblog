import { SET_MESSAGE } from './actionTypes';

export const setMessage = message => dispatch => {
  dispatch({
    type: SET_MESSAGE,
    payload: {
      message
    }
  });
};
