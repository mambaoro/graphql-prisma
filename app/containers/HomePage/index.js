/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Users from '../../components/Users/Loadable';
import Posts from '../../components/Posts/Loadable';
import Recaptcha from '../../components/Recaptcha/Loadable';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <h1>
        <div>
          <Users />
          <div style={{ color: 'red' }}>Next Section</div>
          <Posts />
          <div style={{ color: 'green' }}>Next Section</div>
          <Recaptcha />
        </div>
      </h1>
    );
  }
}
