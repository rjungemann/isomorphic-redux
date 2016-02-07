import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as UserActions from '../actions/user-actions';

export default class NavbarView extends React.Component {
  static propTypes = {
    path: PropTypes.string
  };

  classNamesFor (currentPath) {
    if (this.props.path === currentPath) {
      return 'nav-item active';
    }

    return 'nav-item';
  };

  handleSignout = (e) => {
    let dispatch = this.props.dispatch;

    dispatch(UserActions.signoutUser())
      .then(() => {
        return dispatch(routeActions.push('/'));
      });

    e.preventDefault();
  };

  render () {
    const user = this.props.user;
    const userSigninLink = user ?
      <li className={this.classNamesFor('/users/signin')}>
        <Link className="nav-link" to="/users/signin">Sign In</Link>
      </li> :
      null;
    const userCreateLink = user ?
      <li className={this.classNamesFor('/users/new')}>
        <Link className="nav-link" to="/users/new">Sign Up</Link>
      </li> :
      null;
    const userSignoutLink = !user ?
      <li className="nav-item">
        <a className="nav-link" href="javascript:;" onClick={this.handleSignout}>Sign Out</a>
      </li> :
      null;

    return (
      <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
        <Link className="navbar-brand" to="/">Isomorphic Redux</Link>

        <ul className="nav navbar-nav">
          <li className={this.classNamesFor('/')}>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          {userSigninLink}
          {userCreateLink}
          {userSignoutLink}
        </ul>
      </nav>
    );
  }
}

export default connect(state => ({ user: state.user }))(NavbarView);
