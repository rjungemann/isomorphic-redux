import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux'
import * as UserActions from '../actions/user-actions';

class UsersNewView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static needs = [
  ];

  handleSignup = (e) => {
    const dispatch = this.props.dispatch;
    const username = this.refs['username'].value;
    const password = this.refs['password'].value;
    const passwordConfirmation = this.refs['password-confirmation'].value;

    dispatch(UserActions.createUser(username, password, passwordConfirmation))
      .then(() => {
        return dispatch(routeActions.push('/'));
      });

    e.preventDefault();
  };

  render () {
    return (
      <div id="users-signin-view">
        <h1>Sign In</h1>

        <form>
          <fieldset className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" placeholder="johndoe" ref="username"/>
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" ref="password"/>
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="password-confirm">Confirm Password</label>
            <input type="password" className="form-control" id="password-confirm" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" ref="password-confirmation"/>
          </fieldset>

          <button type="submit" className="btn btn-primary" onClick={this.handleSignup}>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default connect(state => ({}))(UsersNewView);
