import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NavbarView from './navbar-view';

export default class AppView extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render () {
    const user = this.props.user;
    const containerStyle = {
      marginTop: '64px'
    };

    return (
      <div id="app-view">
        <NavbarView path={this.props.location.pathname} user={user}/>
        <div className="container" style={containerStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(AppView);
