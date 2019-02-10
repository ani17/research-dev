import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView
} from 'react-native';

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

var images = [
  { id : 1, src : require('../assets/1.jpg') },
  { id : 2, src : require('../assets/1.jpg') },
  { id : 3, src : require('../assets/1.jpg') },
  { id : 4, src : require('../assets/1.jpg') },
];

export default class Demo extends Component {

  constructor() {
    super();
    this.state = {
      activeImage: null
    }
  }

  componentWillMount() {
    this.allImages = {};
    this.oldPosition = {};
    this.position = new Animated.ValueXY();
    this.dimension = new Animated.ValueXY();
    this.animation = new Animated.Value(0);
  }

  openImage = (index) => {
    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX; 
      this.oldPosition.y = pageY; 
      this.oldPosition.width = width; 
      this.oldPosition.height = height;

      this.position.setValue({x: pageX, y: pageY});
      this.dimension.setValue({x: width, y: height});

      this.setState({
          activeImage: images[index]
        },() => {
          this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
            Animated.parallel([
              Animated.timing(this.position.x,{
                toValue: dPageX,
                duration: 300
              }),
              Animated.timing(this.position.y,{
                toValue: dPageY,
                duration: 300
              }),
              Animated.timing(this.dimension.x,{
                toValue: dWidth,
                duration: 300
              }),
              Animated.timing(this.dimension.y,{
                toValue: dHeight,
                duration: 300
              }),
              Animated.timing(this.animation,{
                toValue: 1,
                duration: 300
              })
            ]).start();
          })
        }
      );
    }); 
  }

  closeImage = () => {
    Animated.parallel([
      Animated.timing(this.position.x,{
        toValue: this.oldPosition.x,
        duration: 300
      }),
      Animated.timing(this.position.y,{
        toValue: this.oldPosition.y,
        duration: 300
      }),
      Animated.timing(this.dimension.x,{
        toValue: this.oldPosition.width,
        duration: 300
      }),
      Animated.timing(this.dimension.y,{
        toValue: this.oldPosition.height,
        duration: 300
      }),
      Animated.timing(this.animation,{
        toValue: 0,
        duration: 300
      })
    ]).start(() => {
      this.setState({
        activeImage: null
      })
    });
  }

  render() {
    
    const activteImageStyle = {
      width: this.dimension.x,
      height: this.dimension.y,
      left: this.position.x,
      top: this.position.y - 50
    }

    const animatedContentY = this.animation.interpolate({
      inputRange: [0,1],
      outputRange: [-150,-40]
    });

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0,0.5,1],
      outputRange: [0,1,1]
    });

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [{
        translateY: animatedContentY
      }]
    }

    const animatedCrossOpacity = {
      opacity: this.animation
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
        { 
          images.map( (image,index) => {
            return (
              <TouchableWithoutFeedback 
              onPress={() => this.openImage(index)}
              key={image.id}>
                <Animated.View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 150, padding: 15 }}>
                  <Image source={image.src} style={{ flex: 1, width: null, height: null , resizeMode: 'cover', borderRadius: 20 }} ref={(image) => (this.allImages[index] = image)}/>
                </Animated.View>
              </TouchableWithoutFeedback>
            )
          } ) 
        }
        </ScrollView>
        <View style={StyleSheet.absoluteFill}
        pointerEvents={this.state.activeImage ? "auto" : "none"}
        >
         <View style={{ flex: 2, zIndex: 1001, borderWidth: 0 }} ref={(view) => (this.viewImage = view)}>
          <Animated.Image
            source={this.state.activeImage ? this.state.activeImage.src : null}
            style={[{ resizeMode: 'cover', width: null, height: null, top: 0, left: 0 }, activteImageStyle]}
          >
          </Animated.Image>
          <TouchableWithoutFeedback onPress={() => this.closeImage()}>
            <Animated.View style={[{ position: 'absolute', top: 30, right: 30 }, animatedCrossOpacity]}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white'}}>X</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
         </View>
         <Animated.View style={[{ flex: 1, zIndex: 1000, backgroundColor: 'white', padding: 20, paddingTop: 50 }, animatedContentStyle]}>
          <Text style={{ fontSize: 24, paddingBottom: 10 }}>
            Fresh Water Beach
          </Text>
          <Text>
            Eiusmod consectetur cupidatat dolor Lorem excepteur excepteur. Nostrud sint officia consectetur eu pariatur laboris est velit. Laborum non cupidatat qui ut sit dolore proident.
          </Text>
         </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});