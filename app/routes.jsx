import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppView from './components/app-view';
import HomeView from './components/home-view';

export default (
  <Route name="app" component={AppView} path="/">
    <IndexRoute component={HomeView}/>
  </Route>
);
