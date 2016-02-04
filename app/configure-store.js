import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { syncHistory, routeReducer } from 'react-router-redux';
import * as reducers from './reducers';
import promiseMiddleware from './lib/promise-middleware';
import maybeWindow from './lib/maybe-window';

export default function configureStore(initialState, history) {
  const router = syncHistory(history);
  const logger = createLogger();
  const middleware = maybeWindow((window) => {
    return compose(
      // Basic middleware.
      applyMiddleware(router, promiseMiddleware, logger),
      // Enable redux browser extention.
      (window && window.devToolsExtension) ? window.devToolsExtension() : (f => f)
    )
  });

  const store = createStore(
    combineReducers(
      Object.assign({}, reducers, {
        routing: routeReducer
      })
    ),
    initialState,
    middleware
  );

  // Required for replaying actions from devtools to work
  router.listenForReplays(store)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers'))
    );
  }

  return store
};
