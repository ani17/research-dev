import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Animated } from 'react-native';

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMG_MAX_HEIGHT = 80;
PROFILE_IMG_MIN_HEIGHT = 40;

export default class TwitterHeader extends Component {
	constructor(props){
		super(props);
		this.state = {
			scrollY: new Animated.Value(0)	
		};
	}
	render(){
		const headerHeight = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
			outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
			extrapolate: 'clamp'
		});

		const profileImgHeight = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
			outputRange: [PROFILE_IMG_MAX_HEIGHT , PROFILE_IMG_MIN_HEIGHT],
			extrapolate: 'clamp'
		});

		const profileImgMarginTop = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
			outputRange: [HEADER_MAX_HEIGHT - (PROFILE_IMG_MAX_HEIGHT / 2), HEADER_MAX_HEIGHT + 5],
			extrapolate: 'clamp'
		});

		const headerZindex = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
			outputRange: [0, 1],
			extrapolate: 'clamp'
		});

		const headerTitleBottom = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMG_MIN_HEIGHT, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMG_MIN_HEIGHT + 20],
			outputRange: [-20, -20, -20, 0],
			extrapolate: 'clamp'
		});

		return (
			<View style={{ flex: 1 }}>
				<Animated.View style={{ 
					flex: 1,
					position: 'absolute',
					top: 0,
					right: 0,
					left: 0,
					backgroundColor: 'lightskyblue',
					height: headerHeight,
					zIndex: headerZindex,
					alignItems: 'center'

				}}>
					<Animated.View style={{position: 'absolute', bottom: headerTitleBottom}}>
						<Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Vitaly Friedman</Text>
					</Animated.View>
				</Animated.View>
				<ScrollView style={{ flex: 1 }}
					onScroll={Animated.event(
						[{nativeEvent: {contentOffset:{y: this.state.scrollY}}}]
					)}
					scrollEventThrottle={16}
				>
					<Animated.View style={{
						height: profileImgHeight,
						width: profileImgHeight,
						borderRadius: PROFILE_IMG_MAX_HEIGHT / 2,
						borderWidth: 3,
						borderColor: 'white',
						overflow: 'hidden',
						marginTop: profileImgMarginTop,
						marginLeft: 10 
					}}>
						<Image source={require('../assets/vitaly-friedman.jpg')} style={{
							flex: 1,
							width: null,
							height: null
						}}/>
					</Animated.View>
					<Text style={{
						fontSize: 20,
						fontWeight: 'bold',
						paddingLeft: 10, 
					}}>
						Vitaly Friedman
					</Text>
					<View style={{height: 1000}}></View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})