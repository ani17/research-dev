import React, { Component } from 'react';
import { Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import Bookcase from './screens/Bookcase';
import EditBook from './screens/EditBook';

const AppTabNavigator = createBottomTabNavigator({
	Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: () => (
        <Icon name="ios-home" type="ionicon" size={24} />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'SETTINGS',
      tabBarIcon: () => (
        <Icon name="ios-settings-outline" type="ionicon" size={24} />
      )
    }
  }
})

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Your App',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" type="ionicon" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  }
})

const AppDrawerNavigator = createDrawerNavigator({
	Home : AppStackNavigator,
  Bookcase: {
    screen: Bookcase,
    navigationOptions: ({navigation}) => ({
      header: null,
    })
  },
  EditBook: {
    screen: EditBook,
    navigationOptions: ({navigation}) => ({
      header: null,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  }
})

const AuthStackNavigator = createStackNavigator({
	Welcome : WelcomeScreen,
	SignIn : SignInScreen,
	SignUp : SignUpScreen
})

export const RootNavigator = createSwitchNavigator({
	AuthLoading : AuthLoadingScreen,
	Auth : AuthStackNavigator,
	App : AppDrawerNavigator
})