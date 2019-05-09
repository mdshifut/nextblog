import {
  SET_MESSAGE,
  LOADING_STATE,
  INLINE_LOADING_STATE,
  USER_MENU_TRIGGER,
  MODAL_TRIGGER
} from "../actions/actionTypes";

const init = {
  message: null,
  isLoading: false,
  inlineLoading: false,
  userMenuIsOpen: false,
  modalIsOpen: false
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
    case USER_MENU_TRIGGER:
      return {
        ...state,
        userMenuIsOpen: !state.userMenuIsOpen
      };
    case MODAL_TRIGGER:
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen
      };

    default:
      return state;
  }
};

export default metaReducer;
