/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { AppRegistry } from "react-native";

import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import TodoList from './List';

export default class App extends Component {
  render() {
    return (
      <RootStack/>
    )
  }
}

const RootStack = createStackNavigator(
  {
    home: HomeScreen,
    list: TodoList
  },
  {
    initialRouteName: 'home'
  }
);


AppRegistry.registerComponent("ToDo", () => App);
