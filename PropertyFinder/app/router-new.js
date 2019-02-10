import React, { Component } from 'react';
import { Dimensions, Platform, TouchableOpacity, View, SafeAreaView, Image, ScrollView, StyleSheet } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createBottomTabNavigator, DrawerItems } from 'react-navigation';
import { Container, Content, Header, Body } from 'native-base';
import { Icon } from 'react-native-elements';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import Bookcase from './screens/Bookcase';
import EditBook from './screens/EditBook';
import Profile from './screens/Profile';
import SearchPage from './components/SearchPage';
import DatePickerScreen from './screens/DatePickerScreen';
import Demo from './screens/Demo';
import TwitterHeader from './screens/TwitterHeader';

const AppTabNavigator = createBottomTabNavigator({
	Home: {
    screen: TwitterHeader,
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

const customDrawerComponent = (props) => (
  <Container>
    <SafeAreaView style={styles.safeArea}>
      <Header style={styles.drawerHeader}>
        <Body>
          <Image style={styles.drawerImage} source={require('./assets/vitaly-friedman.jpg')}/>
        </Body>
      </Header>
      <ScrollView>
        <Content>
          <DrawerItems {...props}/>
        </Content>
      </ScrollView>
    </SafeAreaView>
  </Container>
)

const AppDrawerNavigator = createDrawerNavigator({
	Home : {
    screen: AppStackNavigator,
    navigationOptions: {
      drawerLabel: 'Bookcase',
      drawerIcon: ({ tintColor }) => <Icon name="ios-home" type="ionicon" size={20} color={tintColor} />
    },
  },
  Bookcase: {
    screen: Bookcase,
    navigationOptions: {
      drawerLabel: 'Bookcase',
      drawerIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={20} color={tintColor} />
    },
  },
  EditBook: {
    screen: EditBook,
    navigationOptions: {
      drawerLabel: 'EditBook',
      drawerIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={20} color={tintColor} />
    },
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      drawerLabel: 'Search Properties',
      drawerIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={20} color={tintColor} />
    },
  },
  DatePicker: {
    screen: DatePickerScreen,
    navigationOptions: {
      drawerLabel: 'Date Picker',
      drawerIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={20} color={tintColor} />
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon: ({ tintColor }) => <Icon name="ios-person-outline" type="ionicon" size={20} color={tintColor} />
    },
  }
},
{
    contentComponent : customDrawerComponent
}
)

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

const styles = StyleSheet.create({
  safeArea : {
    flex : 1
  },
  drawerHeader : {
    height : 200
  },
  drawerImage : {
    width : 120,
    height : 120,
    borderRadius : 20
  }
})