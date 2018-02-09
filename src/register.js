import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Alert,
	Image,
	ImageBackground,
	Dimensions,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView
} from 'react-native';

import Button1 from './components/button1';
import Button2 from './components/button2';

import firebase from './config/firebase';
import styles from './theme/theme.js';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const bgroundImg = require('./img/bground.jpg');
const logo = require('./img/guido_outline_smile.png');

class Register extends Component {

	static navigationOptions = {
			header: null,
			gesturesEnabled: false
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
		this.props.navigation.navigate('Login');
	}

	render() {
		return (
			<ImageBackground
				source={bgroundImg}
				style={[{ width: deviceWidth, height: deviceHeight }, styles.container, styles.center]}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={[{ flex: 1 }, styles.center]}>
					<KeyboardAvoidingView
						behavior="position"
					>
						<Text style={[styles.logo, styles.lrg_logo_size]}>B!eat</Text>
						<Image
							source={logo}
							style={{
								width: 100,
								height: 120,
								resizeMode: 'contain',
								alignSelf: 'center'
							}}
						/>

							<TextInput
								ref="emailField"
								style={styles.textInput}
								placeholder="Email"
								autoCapitalize="none"
								onChangeText={(email) => this.setState({ email })}
								value={this.state.email}
								keyboardType={'email-address'}
								onSubmitEditing={() => { this.refs.pwField.focus(); }}
							/>

							<TextInput
								ref="pwField"
								style={styles.textInput}
								placeholder="Password"
								secureTextEntry
								onChangeText={(password) => this.setState({ password })}
								value={this.state.password}
								onSubmitEditing={this.register.bind(this)}
							/>
						</KeyboardAvoidingView>

						<Button1
							text="Register"
							onPress={this.register.bind(this)}
						/>
						<Text>or</Text>
						<Button2
							text="Login"
							onPress={this.login.bind(this)}
						/>
					</View>
				</TouchableWithoutFeedback>
			</ImageBackground>
		);
	}
}

export default Register;
