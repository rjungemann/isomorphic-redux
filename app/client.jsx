import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import routes from 'routes';
import configureStore from 'configure-store'
import immutifyState from 'lib/immutify-state';

const initialState = immutifyState(window.__INITIAL_STATE__);
const store = configureStore(initialState, browserHistory);

render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory}/>
  </Provider>,
  document.body.querySelector('main')
);
