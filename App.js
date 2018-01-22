import React, { Component } from 'react';
import { Font } from 'expo';
import { StackNavigator } from 'react-navigation';
import Login from './src/login';
import LoginManager from './src/loginManager';
import Register from './src/register';
import Home from './src/home';
import Post from './src/post';
import FoodPage from './src/foodPage';

const LoginScreen = StackNavigator({
    Home: { screen: LoginManager },
    Register: { screen: Register },
    HomeScreen: { screen: Home },
    Post: { screen: Post },
    Login: { screen: Login },
    FoodPage: { screen: FoodPage }
});

export default class SigDish extends Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'lobster-reg': require('./assets/fonts/Lobster-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded ? (
        <LoginScreen />
      ) : null
    );
  }
}
