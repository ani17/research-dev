/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import { Root } from "native-base"; //Just to make Toast work
import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { RootNavigator } from './router-new'

export default class App extends Component {
  render() {
    return (
      <Root>
        <RootNavigator />
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
  },
});
