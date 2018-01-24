import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Alert,
	TouchableOpacity,
	Switch,
	Image,
	ImageBackground,
	Dimensions
} from 'react-native';
import * as firebase from 'firebase';

import firebaseApp from './config/firebase';
import styles from './theme/theme.js';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Login extends Component {

	static navigationOptions = {
		header: null
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
				.then(() => {
					return firebase.auth().signInWithEmailAndPassword(stateRef.email, stateRef.password)
					.then(() => {
						propsRef.navigation.navigate('HomeScreen');
					});
				});
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
			//<View style={[styles.container, styles.center]}>
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
					/>
					<Text> Remember Me</Text>
				</View>

				<TouchableOpacity
					style={styles.btn}
					onPress={this.login.bind(this)}
				>
					<Text style={styles.btn_text}>Submit</Text>
				</TouchableOpacity>
				<Text>or</Text>
				<TouchableOpacity
					style={styles.btn2}
					onPress={this.register.bind(this)}
				>
					<Text style={styles.btn2_text}>Register</Text>
				</TouchableOpacity>
				</ImageBackground>
			//</View>
		);
	}
}

export default Login;
