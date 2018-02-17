import React, { Component } from 'react';
import {
	View,
	Text,
	StatusBar,
	ImageBackground,
	Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './theme/SliderEntry.style';
import SliderEntry from './components/sliderEntry';
import Button1 from './components/button1';
import Button2 from './components/button2';
import styles from './theme/theme.js';
import firebase from './config/firebase';

const bgroundImg = require('./img/bground.jpg');

const SLIDER_1_FIRST_ITEM = 1;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class HomePage extends Component {

	static navigationOptions = {
			header: null,
			gesturesEnabled: false
	};

  constructor(props) {
      super(props);
      this.state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
				food: [],
				isLoading: true,
				scrollEnabled: true
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

	newPost() {
		this.props.navigation.navigate('Post');
	}

  recents() {
      return (
          <View style={styles.carouselContainer}>
              <Carousel
                //ref={c => this.slider1Ref = c}
								layout={'default'}
                data={this.state.food}
                renderItem={this.renderItemWithParallax}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.74}
                inactiveSlideOpacity={0.7}
                // inactiveSlideShift={20}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                //loop
                //loopClonesPerSide={2}
                //autoplay
                //autoplayDelay={500}
                //autoplayInterval={3000}
								scrollEnabled={this.state.scrollEnabled}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
              />
          </View>
      );
  }

	renderItemWithParallax({ item, index }, parallaxProps) {
		return (
			<SliderEntry
				data={item}
				even={(index + 1) % 2 === 0}
				parallax
				parallaxProps={parallaxProps}
			/>
		);
	}

  render() {
		const slider = this.recents();

    return (
			<ImageBackground
				source={bgroundImg}
				style={[{ width: deviceWidth, height: deviceHeight },
				styles.container, styles.center]}
			>
				<StatusBar
					barStyle={'dark-content'}
				/>
				<View style={{ justifyContent: 'space-between' }}>
					<Text style={[styles.logo, { fontSize: 30 }]}>B!eat: the Food You Love</Text>
					<View style={styles.center}>
						<Button1
							text='New B!eat'
							onPress={this.newPost.bind(this)}
						/>
						<Button2
							text='Search'
							//onPress={this.search.bind(this)}
						/>
					</View>
					<View style={styles.container}>
						<Text style={[styles.logo, { fontSize: 22 }]}>
							Your recent B!eats: Tap for details
						</Text>
						{ slider }
					</View>
				</View>
      </ImageBackground>
    );
  }
}

export default HomePage;
