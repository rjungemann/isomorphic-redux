import React, { PropTypes } from 'react';
import NavbarView from './navbar-view';

export default class AppView extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render () {
    const containerStyle = {
      marginTop: '64px'
    };

    return (
      <div id="app-view">
        <NavbarView path={this.props.location.pathname}/>
        <div className="container" style={containerStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
