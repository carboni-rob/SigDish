import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';
import styles from '../theme/theme.js';

class FoodCard extends Component {
	render() {
		let icon;
		switch (this.props.rating) {
			case 1:
				icon = require('../img/emoji-dontlike.png');
				break;
			case 2:
				icon = require('../img/emoji-notsure.png');
				break;
			case 3:
				icon = require('../img/emoji-like.png');
				break;
			case 4:
				icon = require('../img/emoji-love.png');
		}

		return (
			<TouchableOpacity
				style={styles.cardView}
				onPress={this.props.select}
			>
				<Image
					source={{ uri: `data:image/jpeg;base64,${this.props.image}` }}
					style={styles.cardImg}
				/>
				<Image
					source={icon}
					style={{
						width: 24,
						height: 24,
						position: 'absolute',
						top: 0,
						left: 75
					}}
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
							{this.props.date}
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
			</TouchableOpacity>
		);
	}
}

module.exports = FoodCard;
