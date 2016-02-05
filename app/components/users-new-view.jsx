import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';

class UsersNewView extends Component {
  static propTypes = {
  };

  static needs = [
  ];

  render () {
    return (
      <div id="users-signin-view">
        <h1>Sign In</h1>

        <form>
          <fieldset className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" placeholder="johndoe"/>
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"/>
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="password-confirm">Confirm Password</label>
            <input type="password" className="form-control" id="password-confirm" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"/>
          </fieldset>

          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
    );
  }
}

export default connect(state => ({}))(UsersNewView);
