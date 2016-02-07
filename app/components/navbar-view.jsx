import React, { Component , PropTypes } from 'react';
import { Link } from 'react-router';

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

  render () {
    const user = this.props.user;
    const userSigninLink = user.isEmpty() ?
      <li className={this.classNamesFor('/users/signin')}>
        <Link className="nav-link" to="/users/signin">Sign In</Link>
      </li> :
      null;
    const userCreateLink = user.isEmpty() ?
      <li className={this.classNamesFor('/users/new')}>
        <Link className="nav-link" to="/users/new">Sign Up</Link>
      </li> :
      null;
    const userSignoutLink = !user.isEmpty() ?
      <li className="nav-item">
        <Link className="nav-link" to="/users/signout">Sign Out</Link>
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
