import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { StackNavigator, createStackNavigator, createBottomTabNavigator, withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from './screens/Login';
import Bookcase from './screens/Bookcase';
import Explore from './screens/Explore';
import AddBook from './screens/AddBook';
import Lists from './screens/Lists';
import Profile from './screens/Profile';
import EditBook from './screens/EditBook';

let screen = Dimensions.get('window');

export const Tabs = createBottomTabNavigator({
  'Bookcase': {
    screen: Bookcase,
    navigationOptions: {
      tabBarLabel: 'Bookcase',
      tabBarIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={28} color={tintColor} />
    },
  },
  'Explore': {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
  'Add Book': {
    screen: AddBook,
    navigationOptions: {
      tabBarLabel: 'Add Book',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-add-circle-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
  'Lists': {
    screen: Lists,
    navigationOptions: {
      tabBarLabel: 'Lists',
      tabBarIcon: ({ tintColor }) => <Icon name="list" type="entypo" size={28} color={tintColor} />
    },
  },
  'My Profile': {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-person-outline" type="ionicon" size={28} color={tintColor} />
    },
  },
});

export const BookcaseStack = createStackNavigator({
  'Login': {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  Bookcase: {
    screen: Bookcase,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  EditBook: {
    screen: EditBook,
    navigationOptions: ({navigation}) => ({
      header: null,
      tabBarVisible: false,
      gesturesEnabled: false
    }),
  },
});

export const RootNavigator = createStackNavigator({
    // Tabs: {
    //   screen: Tabs,
    //   navigationOptions: {
    //     gesturesEnabled: false
    //   }
    // },
    // BookcaseStack: {
    //   screen: BookcaseStack,
    //   navigationOptions: {
    //     gesturesEnabled: false
    //   }
    // }
      mainFlow: {
      screen: createStackNavigator({
        Login: { screen: Login },
        someTab: { screen: Tabs }
      })
    }
  },
  {
    initialRouteName: 'mainFlow',
    headerMode: "none",
    mode: "modal"
  }
);