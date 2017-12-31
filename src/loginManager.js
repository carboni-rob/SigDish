import React, { Component } from 'react';
import firebase from './config/firebase';
import { StackNavigator } from 'react-navigation';

class LoginManager extends Component {
	render() {
		var state = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				state.props. navigation.navigate('HomeScreen');
			} else {
		    // No user is signed in.
		    state.props. navigation.navigate('Login');
		  }
		});
		return(null);
	}
}

export default LoginManager;