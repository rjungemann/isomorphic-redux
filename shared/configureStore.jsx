import * as reducers from 'reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'lib/promiseMiddleware';

export default function configureStore(initialState) {
  const reducer = combineReducers(reducers);
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);
  return store
};
