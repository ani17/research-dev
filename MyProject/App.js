import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthLoadingScreen from './app/screens/AuthLoadingScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import SignInScreen from './app/screens/SignInScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import HomeScreen from './app/screens/HomeScreen';
import SettingsScreen from './app/screens/SettingsScreen';

const RootStack = createStackNavigator();
const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function AppBottomTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </Tab.Navigator>
    );
}

function AppStackNavigator() {
    return (
        <AppStack.Navigator>
            <AppStack.Screen
                name="AppBottomTabNavigator"
                component={AppBottomTabNavigator}
            />
        </AppStack.Navigator>
    );
}

function AppDrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="AppStack"
                component={AppStackNavigator}
            />
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </Drawer.Navigator>
    );
}

function AuthStackNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Welcome"
                component={WelcomeScreen}
            />
            <AuthStack.Screen
                name="SignIn"
                component={SignInScreen}
            />
            <AuthStack.Screen
                name="SignUp"
                component={SignUpScreen}
            />
        </AuthStack.Navigator>
    );
}

function RootNavigator() {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen
                    name="AuthLoading"
                    component={AuthLoadingScreen}
                />
                <RootStack.Screen
                    name="AuthFlow"
                    component={AuthStackNavigator}
                />
                <RootStack.Screen
                    name="App"
                    component={AppDrawerNavigator}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;