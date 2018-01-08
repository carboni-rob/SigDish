import { Component } from 'react';
import firebase from './config/firebase';

class LoginManager extends Component {
	render() {
		const state = this;
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				state.props.navigation.navigate('HomeScreen');
			} else {
				// No user is signed in.
				state.props.navigation.navigate('Login');
			}
		});
		return (null);
	}
}

export default LoginManager;
