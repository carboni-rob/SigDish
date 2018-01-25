import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Alert,
	TouchableOpacity,
	Image,
	ImageBackground,
	Dimensions
} from 'react-native';

import firebase from './config/firebase';
import styles from './theme/theme.js';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Register extends Component {

	static navigationOptions = {
			header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	register() {
		const state = this;
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
		.then(() => {
			//Login successful
			state.props.navigation.navigate('HomeScreen');
		}, (error) => {
			//Login error
			Alert.alert(error.message);
		});
	}

	login() {
		this.props.navigation.navigate('Home');
	}

	render() {
		return (
			<ImageBackground
				source={require('./img/bground.jpg')}
				style={[{ width: deviceWidth, height: deviceHeight }, styles.container, styles.center]}
			>
				<Text style={[styles.logo, styles.lrg_logo_size]}>B!eat</Text>
				<Image
					source={require('./img/guido_outline_smile.png')}
					style={{ width: 100, height: 120, resizeMode: 'contain' }}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Email"
					onChangeText={(email) => this.setState({ email })}
					value={this.state.email}
					keyboardType={'email-address'}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Password"
					secureTextEntry
					onChangeText={(password) => this.setState({ password })}
					value={this.state.password}
				/>

				<TouchableOpacity
					style={styles.btn}
					onPress={this.register.bind(this)}
				>
					<Text style={styles.btn_text}>Register</Text>
				</TouchableOpacity>
				<Text>or</Text>
				<TouchableOpacity
					style={styles.btn2}
					onPress={this.login.bind(this)}
				>
					<Text style={styles.btn2_text}>Login</Text>
				</TouchableOpacity>
				</ImageBackground>
		);
	}
}

export default Register;
