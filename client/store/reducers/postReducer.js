import { ADD_POST_CONTENT } from "../actions/actionTypes";

const init = {
  title: "",
  content: "",
  contentHtml: ""
};

const postReducer = (state = init, action) => {
  switch (action.type) {
    case ADD_POST_CONTENT:
      return {
        ...state,
        ...action.payload.postContent
      };

    default:
      return state;
  }
};

export default postReducer;
