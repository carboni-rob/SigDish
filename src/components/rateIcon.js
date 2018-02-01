import React, { Component } from 'react';
import {
	TouchableOpacity,
	Image
} from 'react-native';

import IconSelector from './iconSelector';

class RateIcon extends Component {
	render() {
		const iconImg = IconSelector(this.props.rating).iconImg;
		return (
			<TouchableOpacity
				onPress={this.props.selected}
				style={[styles.rateBtnOff, this.props.active && styles.rateBtnOn]}
			>
				<Image source={iconImg} style={styles.iconSize} />
			</TouchableOpacity>
		);
	}
}

const styles = {
	rateBtnOff: {
		padding: 10,
		borderWidth: 1,
		borderColor: 'transparent'
	},
	rateBtnOn: {
		borderColor: '#000',
		borderWidth: 1,
		borderRadius: 10
	},
	iconSize: {
		width: 32,
		height: 32
	}
};

module.exports = RateIcon;
