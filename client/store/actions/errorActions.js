import * as actionTypes from './actionTypes';

export const catchError = error => ({
  type: actionTypes.CATCH_ERROR,
  payload: { error }
});
