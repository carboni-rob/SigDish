import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';

class Button1 extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 5,
          width: 150,
          backgroundColor: '#C00000',
          shadowOffset: { width: 5, height: 5, },
          shadowColor: 'black',
          shadowOpacity: 0.7
        }}
        onPress={this.props.onPress}
      >
        <Text
          style={{
            color: '#fff',
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

export default Button1;
