import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

class Iconsearch extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          padding: 10,
          backgroundColor: '#c4c4c4',
          marginBottom: 1
        }}
      >
        <Text style={{ flex: 1 }}>{this.props.searchType}</Text>
        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            onPress={this.props.select1}
          >
            <Image
            source={require('../img/emoji-dontlike.png')}
            style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.select2}
          >
            <Image
            source={require('../img/emoji-notsure.png')}
            style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.select3}
          >
            <Image
            source={require('../img/emoji-like.png')}
            style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.select4}
          >
            <Image
            source={require('../img/emoji-love.png')}
            style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

module.exports = Iconsearch;
