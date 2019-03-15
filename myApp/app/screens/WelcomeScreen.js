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
        <View style={styles.button}>
          <Button title="Sign In" onPress={() => this.props.navigation.navigate('SignIn')} />
        </View>
        <View style={styles.button}>
          <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    width: 100,
    height: 50,
    alignItems: 'center',
    marginLeft: 130 
  }
});