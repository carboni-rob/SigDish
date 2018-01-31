import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StatusBar,
	ImageBackground,
	Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/sliderEntry';
import styles from './theme/theme.js';
import firebase from './config/firebase';

const bgroundImg = require('./img/bground.jpg');
const logo = require('./img/guido_outline_smile.png');

const SLIDER_1_FIRST_ITEM = 1;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

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

  recents() {
      return (
          <View style={styles.exampleContainer}>
              <Carousel
                ref={c => this.slider1Ref = c}
                data={this.state.food}
                renderItem={this.renderItemWithParallax}
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
          </View>
      );
  }

	newPost() {
		this.props.navigation.navigate('Post');
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
				<View style={{ justifyContent: 'space-between' }}>
					<Text style={[styles.logo, { fontSize: 30 }]}>B!eat: the Food You Love</Text>
					<View style={styles.center}>
						<TouchableOpacity
							style={styles.btn}
							onPress={this.newPost.bind(this)}
						>
							<Text style={styles.btn_text}>New B!eat</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.btn2}
							//onPress={this.register.bind(this)}
						>
							<Text style={styles.btn2_text}>Search</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.container}>
            <StatusBar
              translucent
              barStyle={'dark-content'}
            />
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

export default Home2;
