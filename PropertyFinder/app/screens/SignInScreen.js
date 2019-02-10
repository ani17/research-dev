import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';

import Login from './Login';

export default class SignInScreen extends Component {
  
  signIn = async () => {
      await AsyncStorage.setItem('userToken','Anirudh');
      this.props.navigation.navigate('App');
  }

  render() {
    return (
      // <View style={styles.container}>
        <Login navigation={this.props.navigation}/>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});