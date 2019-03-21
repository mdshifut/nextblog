import {
  SET_MESSAGE,
  LOADING_STATE,
  INLINE_LOADING_STATE
} from '../actions/actionTypes';

const init = {
  message: null,
  isLoading: false,
  inlineLoading: false
};

const metaReducer = (state = init, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message
      };
    case LOADING_STATE:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };
    case INLINE_LOADING_STATE:
      return {
        ...state,
        inlineLoading: action.payload.inlineLoading
      };


    default:
      return state;
  }
};

export default metaReducer;
