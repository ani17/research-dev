import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';

const users = ['Anirudh','Ron'];

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      message: '',
    };
  }

  _userLogin = () => {
    const { navigation } = this.props;
    // Alert.alert(this.state.username);
    if(users.indexOf(this.state.username) !== -1)
      navigation.navigate('Bookcase');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput
            editable={true}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            ref='username'
            returnKeyType='next'
            style={styles.inputText}
            value={this.state.username}
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            style={styles.inputText}
            value={this.state.password}
          />

           <Button
            small
            title='Sign In'
            onPress={this._userLogin}
            />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  inputText: {
    width: 200,
    height: 36,
    padding: 5,
    margin: 5,
    flexGrow: 0,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    width: 217,
    height: 138,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0000FF',
    padding: 10
  }
});