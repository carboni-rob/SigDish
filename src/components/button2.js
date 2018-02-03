import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';

class Button2 extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 5,
          width: 150,
          backgroundColor: '#fff',
          borderWidth: 2,
          borderColor: '#C00000',
          shadowOffset: { width: 5, height: 5, },
          shadowColor: '#000',
          shadowOpacity: 0.7
        }}
        onPress={this.props.onPress}
      >
        <Text
          style={{
            color: '#C00000',
            fontFamily: 'lobsterReg',
            fontSize: 20,
            textAlign: 'center'
          }}
        >
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button2;
