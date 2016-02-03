import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { hashHistory } from 'react-router'
import { Provider } from 'react-redux';
import routes from 'routes';
import configureStore from 'configureStore'
import immutifyState from 'lib/immutifyState';

const initialState = immutifyState(window.__INITIAL_STATE__);
const store = configureStore(initialState)

render(
  <Provider store={store}>
    <Router children={routes} history={hashHistory}/>
  </Provider>,
  document.getElementById('react-view')
);
