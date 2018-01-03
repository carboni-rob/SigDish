import Login from './src/login';
import LoginManager from './src/loginManager';
import Register from './src/register';
import Home from './src/home';
import Post from './src/post';
import FoodPage from './src/foodPage';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

const LoginScreen = StackNavigator({
    Home: { screen: LoginManager },
    Register: { screen: Register},
    HomeScreen: { screen: Home},
    Post: { screen: Post},
    Login: { screen: Login },
    FoodPage: { screen: FoodPage}
});

export default class SigDish extends Component {

  render() {
    return <LoginScreen/>;
  }
}