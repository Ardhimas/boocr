import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import Home from './Home';
import History from './History';

const Tab = TabNavigator({
  Home: {
    screen: Home,
  },
  History: {
    screen: History,
  },
}, {
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default class Tabs extends Component {
  render() {
    return (
      <Tab />
    );
  }
}
