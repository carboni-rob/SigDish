import React, { Component } from 'react';
import {
	TouchableOpacity,
	Image
} from 'react-native';
import styles from '../theme/theme.js';


class RateIcon extends Component {
	render() {
		
		var iconImg;
		switch(this.props.rating) {
		    case 1:
		        iconImg = require('../img/emoji-dontlike.png');
		        break;
		    case 2:
		        iconImg = require('../img/emoji-notsure.png');
		        break;
		    case 3:
		        iconImg = require('../img/emoji-like.png');
		        break;
		    case 4:
		        iconImg = require('../img/emoji-love.png');
		};

		return(
			<TouchableOpacity
	            onPress={this.props.selected}
	            style={ [styles.rateBtnOff, this.props.active && styles.rateBtnOn]}
	        >
	            <Image source={iconImg} style={{width: 32, height: 32}}/>
	        </TouchableOpacity>
	    );

	}
}

module.exports = RateIcon;