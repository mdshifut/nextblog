import * as actionTypes from '../actions/actionTypes';

const init = {
  isAuthenticated: false,
  user: null
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        user: action.payload.user,
        isAuthenticated: action.payload.user ? true : null
      };

    default:
      return state;
  }
};

export default authReducer;
