import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';
// import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon, Toast } from 'native-base';

const users = ['Anirudh','Ron'];

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      showToast: false
    };
  }

  _userLogin = async () => {
    // const { navigation } = this.props;
    // Alert.alert(this.state.username);
    if(users.indexOf(this.state.username) !== -1) {
      await AsyncStorage.setItem('userToken',this.state.username);
      this.props.navigation.navigate('App');
    }
    else{
      Alert.alert("Wrong Credentials!");
    }
  }
  
  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="username"
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="password"
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
        />
        <Button
          title="Login"
          onPress={this._userLogin}
          color="#841584"
        />
      </View>
    );
  }
}