import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
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

  state = {
    isbn: null,
    imageUri: null,
  }

  registerBarcode = (e) => {
    Alert.alert(
      'Barcode Found!',
      `Type: ${e.type}\nData: ${e.data}`,
    );
    this.setState({
      isbn: e.data,
      imageUri: `http://covers.openlibrary.org/b/isbn/${e.data}-S.jpg`,
    });
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${e.data}`)
      .then(res => res.json())
      .then((json) => {
        console.log('json', json);
        const volumeInfo = json.items[0].volumeInfo;
        this.setState({
          imageUri: volumeInfo.imageLinks.thumbnail,
        });
      });
    console.log(`http://covers.openlibrary.org/b/isbn/${e.data}-S.jpg`);
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
    const { imageUri } = this.state;
    return (
      <View style={styles.container}>
        {imageUri && <Image
          source={{ uri: imageUri }}
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
        />}
        <Text style={styles.capture} onPress={this.showCamera}>[Camera]</Text>
      </View>
    );
  }
}
