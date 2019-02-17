import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  Easing
} from 'react-native';

export default class Animations extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount(){
    Animated.sequence([
      Animated.timing(this.animatedValue, {
        toValue: 150,
        duration: 1500,
      }),
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 1500,
      })
    ]).start()
  }
  render() {
    const interpolateColor = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(0, 0, 0)', 'rgb(51, 250, 170)']
    })
    const interpolateColor2 = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(0, 0, 0)', 'rgb(51, 250, 170)']
    })
    const animatedStyle1 = {
      backgroundColor: interpolateColor,
      transform:[
        { translateY: this.animatedValue }
      ]
    }
    const animatedStyle2 = {
      backgroundColor: interpolateColor2,
      transform:[
        { translateY: this.animatedValue }
      ]
    }
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyle1]}/>
        <Animated.View style={[styles.box, animatedStyle2]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row', 
  },
  box: {
    backgroundColor: '#333',
    width: 100,
    height: 100,
    justifyContent: 'space-between' 
  }
});