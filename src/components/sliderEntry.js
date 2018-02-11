import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles, { itemWidth, slideHeight } from '../theme/SliderEntry.style';
import IconSelector from './iconSelector';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const margin = 20;

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
          flippedBack: false,
          flippedForw: false
        };
    }

    componentWillMount() {
      this.animatedValue = new Animated.Value(0);
    }

    animate() {
      this.setState({ flippedBack: !this.state.flippedBack });
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    }


    get image() {
        const { data: { image }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: `data:image/jpeg;base64,${image}` }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: `data:image/jpeg;base64,${image}` }}
              style={styles.image}
            />
        );
    }

    render() {
        const { data: { dish, place, rating }, even } = this.props;
        const iconImg = IconSelector(rating).iconImg;
        const interpolateRotation = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });
        const interpolateEnlargeWidth = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [itemWidth, deviceWidth - margin],
        });
        const rotation = {
          transform: [
            { rotateY: interpolateRotation }
          ],
        };
        const enlarge = {
          width: interpolateEnlargeWidth,
          height: deviceHeight - margin
        };

        const title = dish ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { dish }
            </Text>
        ) : false;

        return (
            <Animated.View
              style={this.state.flippedBack ? rotation : {}}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.slideInnerContainer, this.state.flippedBack ? enlarge : {}]}
                onPress={this.animate.bind(this)}
              >
              <View style={styles.shadow}>
                  <View
                    style={[
                      styles.imageContainer,
                      even ? styles.imageContainerEven : {}
                    ]}
                  >
                      { this.image }
                      <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                      <Image
                        source={iconImg}
                        style={{
                          width: 48,
                          height: 48,
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}
                      />
                  </View>
                  <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                      { title }
                      <Text
                        style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                        numberOfLines={2}
                      >
                          { place }
                      </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
        );
    }
}
