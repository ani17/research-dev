import React, { Component } from 'react';
import { Dimensions, Platform, TouchableOpacity, View, SafeAreaView, Image, ScrollView, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

const AppBottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-home" type="ionicon" size={20} color={tintColor} />
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="ios-settings" type="ionicon" size={20} color={tintColor} />
    },
  }
})

const AppStackNavigator = createStackNavigator({
  AppBottomTabNavigator:{
    screen: AppBottomTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'App',
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
  <ScrollView style={styles.safeArea}>
    <View style={styles.imageContainer}>
      <Image style={styles.drawerImage} source={require('./assets/vitaly-friedman.jpg')}/>
    </View>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Tabs: {
    screen: AppStackNavigator,
    navigationOptions: {
      drawerLabel: '',
      drawerIcon: ({ tintColor }) => <Icon name="md-menu" type="ionicon" size={20} color={tintColor} />
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => <Icon name="ios-home" type="ionicon" size={20} color={tintColor} />
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon: ({ tintColor }) => <Icon name="ios-settings" type="ionicon" size={20} color={tintColor} />
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

const RootNavigator = createSwitchNavigator({
	AuthLoading : AuthLoadingScreen,
  AuthFlow : AuthStackNavigator,
  App: AppDrawerNavigator
})

export const MainNavigator = createAppContainer(RootNavigator);

const styles = StyleSheet.create({
  safeArea : {
    flex : 1
  },
  imageContainer : {
    width: 120,
    height: 120,
    marginTop: 10,
    marginLeft: 50,
    marginBottom: 10,
  },
  drawerImage : {
    flex: 1,
    width : null,
    height : null,
    borderRadius : 20,
  }
})