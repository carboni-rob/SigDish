import React, { Component } from 'react';
import { View, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/sliderEntry';
import styles, { colors } from './styles/index.style';
import { ENTRIES1 } from './static/entries';
import firebase from './config/firebase';

const SLIDER_1_FIRST_ITEM = 1;

class Home2 extends Component {

	static navigationOptions = {
			header: null,
			gesturesEnabled: false
	};

  constructor(props) {
      super(props);
      this.state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
				food: [],
				isLoading: true
      };
  }

	componentDidMount() {
		this.getFood();
	}

	getFood() {
		firebase.database().ref('food').on('value', (snap) => {
			const items = [];
			snap.forEach((child) => {
				const item = child.val();
				items.push(item);
			});
			items.reverse();
			this.setState({ food: items, isLoading: false });
		});
	}

  _renderItemWithParallax({ item, index }, parallaxProps) {
      return (
          <SliderEntry
            data={item}
            even={(index + 1) % 2 === 0}
            parallax
            parallaxProps={parallaxProps}
          />
      );
  }

  mainExample() {
      const { slider1ActiveSlide } = this.state;

      return (
          <View style={styles.exampleContainer}>
              <Carousel
                ref={c => this._slider1Ref = c}
                data={this.state.food}
                renderItem={this._renderItemWithParallax}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                // inactiveSlideShift={20}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop
                loopClonesPerSide={2}
                autoplay
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
              />
              <Pagination
                dotsLength={this.state.food.length}
                activeDotIndex={slider1ActiveSlide}
                containerStyle={styles.paginationContainer}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                dotStyle={styles.paginationDot}
                inactiveDotColor={colors.black}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
                tappableDots={!!this._slider1Ref}
              />
          </View>
      );
  }

    render() {
			const example1 = this.mainExample();

      return (
          <SafeAreaView style={styles.safeArea}>
              <View style={styles.container}>
                  <StatusBar
                    translucent
                    backgroundColor={'rgba(0, 0, 0, 0.3)'}
                    barStyle={'light-content'}
                  />
                  <ScrollView
                    style={styles.scrollview}
                    scrollEventThrottle={200}
                    directionalLockEnabled
                  >
                      { example1 }
                  </ScrollView>
              </View>
          </SafeAreaView>
      );
  }
}

export default Home2;
