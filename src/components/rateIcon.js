import React, { Component } from 'react';
import {
	TouchableOpacity,
	Image
} from 'react-native';

import IconSelector from './iconSelector';
import styles from '../theme/theme.js';


class RateIcon extends Component {
	render() {
		const iconImg = IconSelector(this.props.rating).iconImg;
		return (
			<TouchableOpacity
				onPress={this.props.selected}
				style={[styles.rateBtnOff, this.props.active && styles.rateBtnOn]}
			>
				<Image source={iconImg} style={{ width: 32, height: 32 }} />
			</TouchableOpacity>
		);
	}
}

module.exports = RateIcon;
