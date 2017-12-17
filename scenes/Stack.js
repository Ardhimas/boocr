import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';

import Tab from './Tab';
import Scanner from './Scanner';

const returnScanner = ({ navigation }) => (
  <Scanner navigation={navigation} registerBarcode={navigation.state.params.registerBarcode} />
);

returnScanner.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const RootNavigator = StackNavigator({
  Tab: {
    screen: Tab,
  },
  Scanner: {
    screen: returnScanner,
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
