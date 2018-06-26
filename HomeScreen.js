import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
// import { createStackNavigator } from 'react-navigation';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to list"
          // onPress={() => this.props.navigation.nagivate}
        />
      </View>
    );
  }
}
