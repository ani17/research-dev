import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';

const RootStack = createStackNavigator();
const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function AppBottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'ios-home' : 'ios-home';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
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
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
            />
            <Drawer.Screen
                name="Home"
                component={AppBottomTabNavigator}
            />
        </Drawer.Navigator>
    );
}

function AuthStackNavigator() {
    return (
        <AuthStack.Navigator initialRouteName="Welcome">
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

export function RootNavigator() {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen
                    name="AuthLoading"
                    component={AuthLoadingScreen}
                    options={{
                        headerLeft: null
                    }}
                />
                <RootStack.Screen
                    name="AuthFlow"
                    component={AuthStackNavigator}
                    options={{
                        headerLeft: null
                    }}
                />
                <RootStack.Screen
                    name="App"
                    component={AppDrawerNavigator}
                    options={{
                        headerLeft:null
                    }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}