import React, { Component } from 'react';
import {
	TouchableOpacity,
	Image,
	Text,
	View
} from 'react-native';

import IconSelector from './iconSelector';

class RateIcon extends Component {
	render() {
		const iconImg = IconSelector(this.props.rating).iconImg;
		const iconTxt = IconSelector(this.props.rating).iconTxt;

		return (
			<TouchableOpacity
				onPress={this.props.selected}
			>
				<View style={[styles.rateBtnOff, this.props.active && styles.rateBtnOn]}>
					<Image
						source={iconImg}
						style={styles.iconSize}
					/>
				</View>
				<Text style={[styles.text, this.props.active && styles.selectedTxt]}>{iconTxt}</Text>
			</TouchableOpacity>
		);
	}
}

const iconWidth = 32;
const iconHeigth = 32;

const styles = {
	rateBtnOff: {
		margin: 10,
		alignItems: 'center'
	},
	rateBtnOn: {
		borderRadius: iconWidth,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 5, },
		shadowColor: '#C00000',
		shadowOpacity: 1
	},
	iconSize: {
		width: iconWidth,
		height: iconHeigth,
	},
	text: {
		backgroundColor: 'transparent'
	},
	selectedTxt: {
		color: '#C00000'
	}
};

module.exports = RateIcon;
