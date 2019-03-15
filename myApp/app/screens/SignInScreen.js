import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage, 
  View
} from 'react-native';
import Login from '../components/Login'

export default class SignInScreen extends Component {
  
  constructor() {
      super();
  }

  signIn = async () => {
      await AsyncStorage.setItem('userToken','Anirudh');
      this.props.navigation.navigate('HomeScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <Login navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});