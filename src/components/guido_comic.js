import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const logo = require('../img/guido_outline_smile.png');

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
          source={logo}
          style={{
            height: 50,
            width: 50,
            resizeMode: 'contain',
            margin: 5
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: 'lobsterReg',
              fontSize: 18,
              textAlign: 'center'
            }}
          >
            {this.props.text}
          </Text>
          <TouchableWithoutFeedback
            onPress={this.props.onPress}
          >
            <View style={{ margin: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#1067f2',
                  textAlign: 'center'
                }}
              >
                Show me a list instead
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

module.exports = GuidoComic;
