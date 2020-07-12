import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class HomeScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: 'User',
    };
    this.getUser()
  }

  getUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({username:userToken});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Hello {this.state.username} !
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