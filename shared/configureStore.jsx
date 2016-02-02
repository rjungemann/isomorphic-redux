import * as reducers from 'reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'lib/promiseMiddleware';

function direct (clientCallback, serverCallback) {
  try {
    window;
    clientCallback(window);
  } catch (e) {
    serverCallback();
  }
}

export default function configureStore(initialState) {
  let enhancer;
  direct(
    (window) => {
      enhancer = compose(
        applyMiddleware(promiseMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    },
    () => {
      enhancer = compose(
        applyMiddleware(promiseMiddleware)
      )
    }
  );

  let reducer = combineReducers(reducers);
  let store = createStore(reducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store
};
