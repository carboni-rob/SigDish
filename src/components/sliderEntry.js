import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
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
        this.rotationValue = new Animated.Value(0);
        this.scaleValue = new Animated.Value(0);
        this.state = {
          rotating: false,
          frontShowing: true
        };
    }

    animate() {
      this.setState({ rotating: true });
      this.setState({ frontShowing: !this.state.frontShowing });
      Animated.parallel([
        Animated.spring(this.scaleValue, {
          toValue: 1,
          duration: 500
        }),
        Animated.timing(this.rotationValue, {
          toValue: 1,
          duration: 300
        })
      ]).start(() => {
        this.setState({ rotating: false });
        this.rotationValue.setValue(0);
      });
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

    renderFront() {
      if (this.state.frontShowing) {
        const { data: { dish, place, rating }, even } = this.props;
        const iconImg = IconSelector(rating).iconImg;
        const title = dish ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { dish }
            </Text>
        ) : false;

        return (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.slideInnerContainer}
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
        );
      }
    }

    renderBack() {
      if (this.state.frontShowing === false) {
        const { data: { dish, place, description, date }, even } = this.props;
        const comment = description ? (
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
          >
            "{description}"
          </Text>
        ) : (<Text
          style={[styles.subtitle, even ? styles.subtitleEven : {}]}
        >
          There are no comments on this dish.
        </Text>);
        return (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.slideInnerContainer}
            onPress={this.animate.bind(this)}
          >
            <View style={styles.shadow}>
            <View style={[styles.backContainer, even ? styles.backContainerEven : {}]}>
              <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}
              >
                  { dish }
              </Text>
              <Text
                style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                numberOfLines={2}
              >
                  Tasted at { place } on { date }
              </Text>
              {comment}
            </View>
            </View>
          </TouchableOpacity>
        );
      }
    }

    render() {
      const front = this.renderFront();
      const back = this.renderBack();
      let interpolateRotation;
      if (this.state.frontShowing) {
        interpolateRotation = this.rotationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        });
      } interpolateRotation = this.rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '0deg'],
      });
      const interpolateScale = this.scaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        });

      const rotation = {
        transform: [
          { rotateY: interpolateRotation }
        ],
      };
      const scale = {
        transform: [
          { scale: interpolateScale }
        ],
      };
        return (
            <Animated.View style={this.state.rotating ? [rotation] : {}} >
              <Animated.View style={!this.state.frontShowing ? [scale] : {}} >
                {front}
                {back}
              </Animated.View>
            </Animated.View>
        );
    }
}
