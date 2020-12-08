import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import * as reducers from './reducers';

//export default () => createStore(mainReducer, applyMiddleware)