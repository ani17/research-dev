import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

export default class AuthLoadingScreen extends Component {
  
  constructor() {
      super();
      this.loadApp();
  }

  loadApp = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // this.props.navigation.navigate(userToken ? 'App' : 'AuthFlow');
    if(userToken)
      this.props.navigation.navigate('App');
    else
      this.props.navigation.navigate('AuthFlow', { screen: 'Welcome' });

  }
  
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.title}>
          Auth Screen
        </Text>
      </View>
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