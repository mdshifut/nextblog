import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import metaReducer from "./metaReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  postContent: postReducer,
  meta: metaReducer
});

export default rootReducer;
