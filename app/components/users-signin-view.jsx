import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user-actions';

class UsersSigninView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static needs = [
  ];

  handleSignin = (e) => {
    e.preventDefault();

    let username = this.refs['username-input'];
    let password = this.refs['password-input'];

    this.props.dispatch(UserActions.signinUser(username.value, password.value));

    username.value = '';
    password.value = '';
  };

  render () {
    return (
      <div id="users-signin-view">
        <h1>Sign In</h1>

        <form>
          <fieldset className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" placeholder="johndoe" ref="username-input"/>
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" ref="password-input"/>
          </fieldset>

          <button type="submit" className="btn btn-primary" onClick={this.handleSignin}>Sign In</button>
        </form>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(UsersSigninView);
