import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	Animated,
	TouchableOpacity,
  Alert
} from 'react-native';

export default class FilpCard extends Component {
	componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.currentAnimatedValue = 0

    this.animatedValue.addListener(({ value }) => {
      this.currentAnimatedValue = value;
    })
    
    this.interpolateFront = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })

    this.interpolateBack = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }
  componentDidMount() {
    // Animated.timing(this.animatedValue, {
    //   toValue: 180,
    //   duration: 1500
    // }).start()
  }
  flipCard = () => {
    // Alert.alert("Hello")
    if(this.currentAnimatedValue >= 180) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 1500
      }).start()
    }
    else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        duration: 1500
      }).start()
    }
  }
  render() {
    const frontAnimatedStyle = {
      transform:[
        { rotateY: this.interpolateFront } 
      ]
    }
    const backAnimatedStyle = {
      transform:[
        { rotateY: this.interpolateBack } 
      ]
    }
		return(
			<View style={styles.container}>
				<View>
          <Animated.View style={[styles.card, frontAnimatedStyle]}>
  					<Text style={styles.flipText}>
              Front
            </Text>
  				</Animated.View>
  				<Animated.View style={[styles.card, styles.back, backAnimatedStyle]}>
  					<Text style={styles.flipText}>
              Back
            </Text>
  				</Animated.View>
        </View>
				<TouchableOpacity onPress={this.flipCard}>
					<Text>Flip</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles  = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	card: {
		width: 200,
		height: 200,
		alignItems: 'center',
		justifyContent: 'center', 
		backgroundColor: 'red',
		backfaceVisibility: 'hidden'
	},
	back:{
		backgroundColor: 'green',
		position: 'absolute',
		top: 0,
	},
	flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});