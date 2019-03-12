import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const middlewares = [thunk];

export default (initialState, options) =>
  createStore(rootReducer, applyMiddleware(...middlewares));
