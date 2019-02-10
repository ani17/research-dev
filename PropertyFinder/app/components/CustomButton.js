import React, { Component } from 'react';
import { View, Button } from 'react-native';

/*
This a Functional Component.
These do not have any state of their own, unlike the class component.
These are just representational components.
*/
const CustomButton = (props) => {
	return (
		<View>
			<Button title="Add Product" onPress={() => props.onPress()}/>
		</View>
	);
}

export default CustomButton;