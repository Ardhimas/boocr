import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';

import Home from './Home';
import Scanner from './Scanner';

const RootNavigator = StackNavigator({
  Home: {
    screen: Home,
  },
  Scanner: {
    screen: Scanner,
  },
});

export default class Stack extends Component {
  static childContextTypes = {
    stack: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      stack: this,
    };
  }

  render() {
    return (
      <RootNavigator ref={(app) => { this.app = app; }} />
    );
  }
}
