'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,	
  View,
} from 'react-native';
import {Tabs} from '../router';
import {RootNavigator} from '../router';

export default class Books extends Component<{}> {
  render() {
    return (
      // <Tabs/>
      <RootNavigator>
        <Tabs/>
      </RootNavigator>
    );
  }
}

// class Greeting extends Component <{}> {
//   render() {
//     return (
//       <Text>Hello {this.props.name}!</Text>
//     );
//   }
// }

// export default class LotsOfGreetings extends Component <{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Greeting name='Rexxar' />
//         <Greeting name='Jaina' />
//         <Greeting name='Valeera' />
//       </View>
//     );
//   }
// }

// export default class FlexDimensionsBasics extends Component {
//   render() {
//     return (
//       // Try removing the `flex: 1` on the parent View.
//       // The parent will not have dimensions, so the children can't expand.
//       // What if you add `height: 300` instead of `flex: 1`?
//       <View style={styles.container}>
//         <View style={{backgroundColor: 'powderblue', width: 50, height: 50}} />
//         <View style={{backgroundColor: 'skyblue', width: 50, height: 50}} />
//         <View style={{backgroundColor: 'steelblue', width: 50, height: 50}} />
//       </View>
//     );
//   }
// }
// 

const styles = StyleSheet.create({
  container: {
  	flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});