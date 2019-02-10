import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign In" onPress={() => this.props.navigation.navigate('SignIn')} />
        <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
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