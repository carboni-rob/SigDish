import React, { Component } from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { StackNavigator } from 'react-navigation';
import Login from './src/login';
import LoginManager from './src/loginManager';
import Register from './src/register';
import Home from './src/home';
import Post from './src/post';
import FoodPage from './src/foodPage';

const lobsterFont = { lobsterReg: require('./assets/fonts/Lobster-Regular.ttf') };
const bgroundImg = require('./src/img/bground.jpg');
const logo = require('./src/img/guido_outline_smile.png');

const LoginScreen = StackNavigator({
    Home: { screen: LoginManager },
    Register: { screen: Register },
    HomeScreen: { screen: Home },
    Post: { screen: Post },
    Login: { screen: Login },
    FoodPage: { screen: FoodPage }
});

function cacheImages(images) {
  return images.map(image => Asset.fromModule(image).downloadAsync());
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class SigDish extends Component {

  state = {
    isReady: false,
  };

  async loadAssetsAsync() {
    const imageAssets = cacheImages([
      bgroundImg,
      logo
    ]);
    const fontAssets = cacheFonts([lobsterFont]);
    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
        <LoginScreen />
    );
  }
}
