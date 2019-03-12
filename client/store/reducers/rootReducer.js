import { combineReducers } from 'redux';
import metaReducer from './metaReducer';
export default combineReducers({ meta: metaReducer });
