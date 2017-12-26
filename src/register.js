import firebase from './config/firebase';
import styles from './theme/theme.js';
import { StackNavigator } from 'react-navigation';

import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	Alert,
	TouchableOpacity
} from 'react-native';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	static navigationOptions = {
	    header: null
	};

	register() {
		var state = this;
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function() {
			//Login successful
			state.props.navigation.navigate('HomeScreen');
		}, function(error) {
			//Login error
			Alert.alert(error.message)
		});
	}

	login() {
		this.props.navigation.navigate('Home');
	}

	render() {
		return (
			<View style={[styles.container, styles.center]}>
				<Text style={ styles.logo }>SigDish_V0.01</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Email"
					onChangeText={(email) => this.setState({email: email})}
					value={this.state.email}
					keyboardType={"email-address"}
				/>
				<View style={styles.line} />
				<TextInput
					style={styles.textInput}
					placeholder="Password"
					secureTextEntry={true}
					onChangeText={(password) => this.setState({password: password})}
					value={this.state.password}
				/>
				<View style={styles.line} />
				<TouchableOpacity
					style={styles.btn}
					onPress={this.register.bind(this)}>

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