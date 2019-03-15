import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

export default class AuthLoadingScreen extends Component {
  
  constructor() {
      super();
      this.loadApp();
  }

  loadApp = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'AuthFlow');
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