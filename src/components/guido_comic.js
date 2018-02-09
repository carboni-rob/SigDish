import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

class GuidoComic extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: deviceWidth,
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 10,
          //margin: 10
        }}
      >
      <Image
        source={require('../img/guido_outline_smile.png')}
        style={{
          height: 50,
          width: 50,
          resizeMode: 'contain',
          margin: 5
        }}
      />
      <Text
        style={{
          flex: 1,
          fontFamily: 'lobsterReg',
          fontSize: 18,
          textAlign: 'center'
        }}
      >
        {this.props.text}
      </Text>
      </View>
    );
  }
}

module.exports = GuidoComic;
