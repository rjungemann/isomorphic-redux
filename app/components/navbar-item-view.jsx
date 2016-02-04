import React, { PropTypes } from 'react';

export default class NavbarItemView extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    href: PropTypes.string,
  };

  render () {
    return (
      <li>
        <a href={this.props.href}>{this.props.title}</a>
      </li>
    )
  }
}
