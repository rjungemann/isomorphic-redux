import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppView from './components/app-view';
import HomeView from './components/home-view';
import UsersSigninView from './components/users-signin-view';
import UsersNewView from './components/users-new-view';

export default (
  <Route name="app" component={AppView} path="/">
    <IndexRoute component={HomeView}/>
    <Route path="users/signin" component={UsersSigninView}/>
    <Route path="users/new" component={UsersNewView}/>
  </Route>
);
