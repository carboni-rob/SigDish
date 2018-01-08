import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Alert,
	TouchableOpacity
} from 'react-native';

import firebase from './config/firebase';
import styles from './theme/theme.js';

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
			<View style={[styles.container, styles.center]}>
				<Text style={styles.logo}>SigDish_V0.01</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Email"
					onChangeText={(email) => this.setState({ email })}
					value={this.state.email}
					keyboardType={'email-address'}
				/>
				<View style={styles.line} />
				<TextInput
					style={styles.textInput}
					placeholder="Password"
					secureTextEntry
					onChangeText={(password) => this.setState({ password })}
					value={this.state.password}
				/>
				<View style={styles.line} />

				<TouchableOpacity
					style={styles.btn}
					onPress={this.register.bind(this)}
				>
					<Text style={styles.text}>Register</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={this.login.bind(this)}>
					<Text style={styles.textBig}>Log In</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Register;
