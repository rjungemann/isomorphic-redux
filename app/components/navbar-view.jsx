import React, { PropTypes } from 'react';

export default class NavbarView extends React.Component {
  static propTypes = {
    children: PropTypes.array
  };

  render () {
    return (
      <nav>
        <ul>{this.props.children}</ul>
      </nav>
    );
  }
}
