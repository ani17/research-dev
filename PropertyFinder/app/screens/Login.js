import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon, Toast } from 'native-base';

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
      Toast.show({
        text: "Wrong Credentials!",
        position: "top"
      });
    }
  }
  
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Icon active name="person" />
              <Input
                placeholder="username"
                onChangeText={(username) => this.setState({username})} 
              />
            </Item>
            <Item>
              <Icon active name='key' 
              iconStyle={{ color: "green" }}
              />
              <Input
                placeholder="password" 
                onChangeText={(password) => this.setState({password})}
                secureTextEntry={true}
              />
            </Item>
            <Button full primary onPress={this._userLogin}>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}