import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import IconSelector from './iconSelector';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };


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
        console.log(iconImg);

        const uppercaseTitle = dish ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { dish.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.slideInnerContainer]}
              onPress={() => { alert(`You've clicked '${dish}'`); }}
            >
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
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
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { place }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
