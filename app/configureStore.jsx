import * as reducers from './reducers';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from './lib/promiseMiddleware';
import { syncHistory, routeReducer } from 'react-router-redux';

function direct (clientCallback, serverCallback) {
  try {
    window;
    clientCallback(window);
  } catch (e) {
    serverCallback();
  }
}

export default function configureStore(initialState, history) {
  let router = syncHistory(history);
  let enhancer;
  direct(
    (window) => {
      enhancer = compose(
        applyMiddleware(router, promiseMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    },
    () => {
      enhancer = compose(
        applyMiddleware(router, promiseMiddleware)
      )
    }
  );

  const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer
  }));
  const store = createStore(reducer, initialState, enhancer);

  // Required for replaying actions from devtools to work
  router.listenForReplays(store)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store
};
