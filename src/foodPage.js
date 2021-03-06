import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Dimensions
} from 'react-native';

import Header from './components/header';
import IconSelector from './components/iconSelector';
import styles from './theme/theme';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class FoodPage extends Component {

	static navigationOptions = {
		header: null
	};

	back() {
		this.props.navigation.navigate('HomeScreen');
	}

	render() {
		const { state } = this.props.navigation;
		const rating = IconSelector(state.params.rating);
		// let ratingDetails;
		// switch (state.params.rating) {
		// 	case 1:
		// 		ratingDetails = {
		// 		rateIcon: require('./img/emoji-dontlike.png'),
		// 		rateText: "I don't like it"
		// 		};
		// 		break;
		// 	case 2:
		// 		ratingDetails = {
		// 		rateIcon: require('./img/emoji-notsure.png'),
		// 		rateText: "I'm not sure"
		// 		};
		// 		break;
		// 	case 3:
		// 		ratingDetails = {
		// 			rateIcon: require('./img/emoji-like.png'),
		// 			rateText: "I like it!"
		// 		};
		// 		break;
		// 	case 4:
		// 		ratingDetails = {
		// 			rateIcon: require('./img/emoji-love.png'),
		// 			rateText: "I love it!"
		// 	};
		// }

		return (
			<View>
				<Header
					title='SigDish_V0.01'
					left={this.back.bind(this)}
					leftText={'Back'}
					leftIcon={'back'}
				/>
				<View style={styles.foodPageContainer}>
					<Text>{state.params.foodName}</Text>
					<Image
						source={{ uri: `data:image/jpeg;base64,${state.params.image}` }}
						style={{ width: deviceWidth, height: (deviceHeight * 0.5), borderRadius: 10 }}
					/>
					<Text>{state.params.foodPlace}</Text>
					<View style={styles.ratingDetails}>
						<Image
							source={rating.iconImg}
							style={{ height: 64, width: 64 }}
						/>
						<Text>{rating.iconTxt}</Text>
					</View>
					<Text>{state.params.description}</Text>
				</View>
			</View>
		);
	}
}

export default FoodPage;
