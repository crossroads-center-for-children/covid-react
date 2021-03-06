import { createStore, compose, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import auth from './auth';
import response from './response';
import admin from './admin';

const rootReducer = combineReducers({ auth, response, admin });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancer = composeEnhancers(applyMiddleware(thunk));

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, storeEnhancer);
}
