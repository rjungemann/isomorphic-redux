import * as reducers from 'reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'lib/promiseMiddleware';

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  try {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0)? matches[1] : null;
  } catch (e) {
    console.log('catch');
  }
}

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(promiseMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
  const reducer = combineReducers(reducers);
  const store = createStore(reducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store
};
