import firebaseApp from './config/firebase';
import * as firebase from 'firebase';
import styles from './theme/theme.js';
import { StackNavigator } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	Alert,
	TouchableOpacity,
	Switch
} from 'react-native';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			stayLogged: false
		};
	}

	static navigationOptions = {
	    header: null
	};

	login() {
		var propsRef = this.props;
		var stateRef = this.state;
		if (stateRef.stayLogged == true) {
			firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(function() {
				propsRef.navigation.navigate('HomeScreen');
			}, function(error) {
				//Login error
				Alert.alert(error.message)
			});
		} else {
			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
				.then(function() {
			    	return firebase.auth().signInWithEmailAndPassword(stateRef.email, stateRef.password)
				    .then(function() {
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
					onPress={this.login.bind(this)}>

					<Text style={styles.text}>Submit</Text>

				</TouchableOpacity>

				<TouchableOpacity onPress={this.register.bind(this)}>
					<Text style={styles.textBig}>Register</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Login;