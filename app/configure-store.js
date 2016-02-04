import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { syncHistory, routeReducer } from 'react-router-redux';
import * as reducers from './reducers';
import promiseMiddleware from './lib/promise-middleware';

export default function configureStore(initialState, history) {
  const router = syncHistory(history);
  const logger = createLogger({
    collapsed: true
  });
  const middleware = [
    applyMiddleware(router),
    applyMiddleware(promiseMiddleware),
  ];

  if (IS_BROWSER) {
    middleware.push(applyMiddleware(logger));

    if (window.devToolsExtension) {
      middleware.push(window.devToolsExtension())
    }
  }

  const store = createStore(
    combineReducers(
      Object.assign({}, reducers, {
        routing: routeReducer
      })
    ),
    initialState,
    compose(...middleware)
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
