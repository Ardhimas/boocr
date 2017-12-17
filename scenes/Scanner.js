import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from 'react-native-camera';
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

export default class Scanner extends Component {
  static contextTypes = {
    stack: PropTypes.object.isRequired,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    registerBarcode: PropTypes.func.isRequired,
  }

  state = {
    hasRead: false,
  }

  onBarCodeRead = async (e) => {
    const { hasRead } = this.state;
    if (!hasRead) {
      await this.setState({
        hasRead: true,
      }, () => {
        this.props.registerBarcode(e);
        this.context.stack.app.dispatch(NavigationActions.back());
      });
    }
  }

  takePicture = () => {
    const options = {};
    // options.location = ...
    this.camera.capture({ metadata: options })
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={this.onBarCodeRead}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        >
          <Text style={styles.capture} onPress={this.takePicture}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}
