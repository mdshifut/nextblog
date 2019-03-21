import { CATCH_ERROR } from '../actions/actionTypes';

const init = {
  signIn: {},
  signInNav: {},
  passwordResetNav: {},
  passwordReset: {},
  signUp: {},
  createNewPassword: {}
};
const errorReducer = (state = init, action) => {
  switch (action.type) {
    case CATCH_ERROR:
      return { ...state, ...action.payload.error };

    default:
      return state;
  }
};

export default errorReducer;
