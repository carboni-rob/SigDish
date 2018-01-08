import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';

class Search extends Component {
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
        <TextInput
          style={{
            flex: 3,
            borderRadius: 10,
            backgroundColor: '#fff',
            height: 30,
            paddingLeft: 5
          }}
          placeholder={this.props.pholder}
          autoFocus={this.props.focus}
          onChangeText={this.props.txtChange}
          value={this.props.srchString}
        />
      </View>
    );
  }
}

module.exports = Search;
