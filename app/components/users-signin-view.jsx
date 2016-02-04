import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';

class UsersSigninView extends Component {
  static propTypes = {
  };

  static needs = [
  ];

  render () {
    return (
      <div id="signin-view">
        <p>Hello, world!</p>
      </div>
    );
  }
}

export default connect(state => ({}))(UsersSigninView);
