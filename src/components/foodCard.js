import React, { Component } from 'react';
import {
	View,
	Text,
	Image
} from 'react-native';
import styles from '../theme/theme.js';

class FoodCard extends Component {
	render() {
		return(
			<View style={styles.cardView}>
				<Image
					source={{uri: 'data:image/jpeg;base64,'+this.props.image}}
					style={styles.cardImg}
				/>
				<View style={styles.cardDetails}>
					<View style={styles.cardDetailsTop}>
						<Text
							numberOfLines={1}
							ellipsizeMode='tail'
							style={styles.cardFoodName}
						>
							{this.props.foodName}
						</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode='tail'
							style={styles.cardFoodDate}
						>
							25/12/17
						</Text>
					</View>
					<View style={styles.cardDetailsBottom}>
						<Text
							numberOfLines={1}
							ellipsizeMode='tail'
							style={styles.cardFoodPlace}
						>
							{this.props.foodPlace}
						</Text>
						<Text
							numberOfLines={3}
							ellipsizeMode='tail'
							style={styles.cardFoodDescription}
						>
							{this.props.description}
						</Text>
					</View>
				</View>
			</View>
		);
	};
}

module.exports = FoodCard;