import Login from './src/login';
import Register from './src/register';
import Home from './src/home';
import Post from './src/post';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

const LoginScreen = StackNavigator({
    Home: { screen: Login },
    Register: { screen: Register},
    HomeScreen: { screen: Home},
    Post: { screen: Post}
});

export default class SigDish extends Component {

  render() {
    return <LoginScreen/>;
  }
}