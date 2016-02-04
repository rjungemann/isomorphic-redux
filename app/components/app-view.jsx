import React, { PropTypes } from 'react';
import NavbarView from './navbar-view';
import NavbarItemView from './navbar-item-view';

export default class AppView extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render () {
    return (
      <div id="app-view">
        <NavbarView>
          <NavbarItemView title="Home" href="/"/>
        </NavbarView>

        <h1>Redux Demo</h1>

        {this.props.children}
      </div>
    );
  }
}
