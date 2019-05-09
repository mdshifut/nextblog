import * as actionTypes from "./actionTypes";

export const addPostContent = postContent => ({
  type: actionTypes.ADD_POST_CONTENT,
  payload: { postContent }
});
