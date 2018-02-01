import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

import styles from '../theme/theme.js';

class Header extends Component {
	render() {
		return (
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<TouchableOpacity
							onPress={this.props.left}
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
								backgroundColor: 'transparent'
							}}
						>
							<Entypo
								name={this.props.leftIcon}
								size={22}
								color="#C00000"
							/>
							<Text style={styles.headerText}>{this.props.leftText}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.headerCenter}>
						<Text style={styles.pageTitle}>{this.props.title}</Text>
					</View>
					<View style={styles.headerRight}>
						<TouchableOpacity
							onPress={this.props.right}
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'flex-end'
							}}
						>
							<Ionicons name={this.props.rightIcon} size={32} color="#4a79c4" />
							<Text style={styles.headerText}>{this.props.rightText}</Text>
						</TouchableOpacity>
					</View>
				</View>
		);
	}
}

module.exports = Header;
