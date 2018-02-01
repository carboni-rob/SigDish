import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Alert,
	Switch,
	Image,
	ImageBackground,
	Dimensions,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import * as firebase from 'firebase';

import Button1 from './components/button1';
import Button2 from './components/button2';

import firebaseApp from './config/firebase';
import styles from './theme/theme.js';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const bgroundImg = require('./img/bground.jpg');
const logo = require('./img/guido_outline_smile.png');

class Login extends Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false
	};

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			stayLogged: false
		};
	}

	login() {
		const propsRef = this.props;
		const stateRef = this.state;
		if (stateRef.stayLogged === true) {
			firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => {
				propsRef.navigation.navigate('HomeScreen');
			}, (error) => {
				//Login error
				Alert.alert(error.message);
			});
		} else {
			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
				.then(() =>
					firebase.auth().signInWithEmailAndPassword(stateRef.email, stateRef.password)
					.then(() => {
						propsRef.navigation.navigate('HomeScreen');
					})
				);
			}
		}

	register() {
		this.props.navigation.navigate('Register');
	}

	goHome() {
		this.props.navigation.navigate('HomeScreen');
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
								onSubmitEditing={this.login.bind(this)}
							/>
						</KeyboardAvoidingView>

						<View
							style={{
								flexDirection: 'row',
								margin: 10,
								alignItems: 'center'
							}}
						>
							<Switch
								value={this.state.stayLogged}
								onValueChange={() => this.setState({ stayLogged: !this.state.stayLogged })}
								style={styles.switchStyle}
							/>
							<Text style={{ backgroundColor: 'transparent' }}> Remember Me</Text>
						</View>

						<Button1
							text="Submit"
							onPress={this.login.bind(this)}
						/>
						<Text>or</Text>
						<Button2
							text="Register"
							onPress={this.register.bind(this)}
						/>
					</View>
				</TouchableWithoutFeedback>
			</ImageBackground>
		);
	}
}

export default Login;
