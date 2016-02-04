import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'

export default class NavbarItemView extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    href: PropTypes.string,
  };

  render () {
    const { title, href } = this.props;

    return (
      <li>
        <Link to={href}>{title}</Link>
      </li>
    )
  }
}

export default connect((state) => state, routeActions)(NavbarItemView);
