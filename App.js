import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Stack from './scenes/Stack';

export default class App extends Component {
  render() {
    return (
      <Stack />
    );
  }
}

AppRegistry.registerComponent('App', () => App);
