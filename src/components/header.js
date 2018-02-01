import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';

import { Entypo, Ionicons } from '@expo/vector-icons';

class Header extends Component {
	render() {
		return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						height: 25,
						marginTop: 0,
						paddingHorizontal: 10
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: 'flex-start'
						}}
					>
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
							<Text
								style={{
									textAlign: 'center',
									fontFamily: 'lobsterReg',
									backgroundColor: 'transparent',
									color: '#C00000',
									fontWeight: 'bold',
									fontSize: 20
								}}
							>
								{this.props.leftText}
							</Text>
						</TouchableOpacity>
					</View>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
						}}
					>
						<Text
						style={{
							justifyContent: 'center',
							color: '#C00000',
							backgroundColor: 'transparent',
							fontSize: 24,
							textAlign: 'center',
							fontFamily: 'lobsterReg'
						}}
						>
							{this.props.title}
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							justifyContent: 'flex-end',
						}}
					>
						<TouchableOpacity
							onPress={this.props.right}
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'flex-end'
							}}
						>
							<Ionicons
								name={this.props.rightIcon}
								size={32} color="#4a79c4"
							/>
							<Text
								style={{
									textAlign: 'center',
									fontFamily: 'lobsterReg',
									backgroundColor: 'transparent',
									color: '#C00000',
									fontWeight: 'bold',
									fontSize: 16
								}}
							>
								{this.props.rightText}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
		);
	}
}

module.exports = Header;
