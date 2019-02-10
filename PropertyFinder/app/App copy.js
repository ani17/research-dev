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
  NavigatorIOS,
} from 'react-native';
// import SearchPage from './components/SearchPage'
import Demo from './components/Demo'

export default class App extends Component<{}> {
  render() {
    return (
      <Root>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Demo',
            component: Demo,
          }}/>
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
