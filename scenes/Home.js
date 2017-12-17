import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

export default class Home extends Component {
  static contextTypes = {
    stack: PropTypes.object.isRequired,
  }

  registerBarcode = (e) => {
    Alert.alert(
      'Barcode Found!',
      `Type: ${e.type}\nData: ${e.data}`,
    );
  }

  showCamera = () => {
    this.context.stack.app.dispatch(NavigationActions.navigate({
      routeName: 'Scanner',
      params: {
        registerBarcode: this.registerBarcode,
      },
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.capture} onPress={this.showCamera}>[Camera]</Text>
      </View>
    );
  }
}
