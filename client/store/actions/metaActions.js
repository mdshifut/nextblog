import * as actionTypes from "./actionTypes";

export const loading = isLoading => ({
  type: actionTypes.LOADING_STATE,
  payload: { isLoading }
});

export const inlineLoading = inlineLoading => ({
  type: actionTypes.INLINE_LOADING_STATE,
  payload: { inlineLoading }
});

export const userMenuTrigger = () => ({
  type: actionTypes.USER_MENU_TRIGGER
});

export const modalTrigger = () => ({
  type: actionTypes.MODAL_TRIGGER
});
