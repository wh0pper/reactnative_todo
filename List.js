import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform,
  Switch,
} from "react-native";


const isAndroid = Platform.OS == "android";
const viewPadding = 20;

export default class TodoList extends Component {
  state = {
    tasks: [],
    text: ""
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;
    console.log(this.state);
    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length.toString(), text: text }),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };

  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };

  componentDidMount() {
    console.log(this);
    // Keyboard.addListener(
    //   isAndroid ? "keyboardDidShow" : "keyboardWillShow",
    //   e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    // );
    //
    // Keyboard.addListener(
    //   isAndroid ? "keyboardDidHide" : "keyboardWillHide",
    //   () => this.setState({ viewPadding: viewPadding })
    // );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
        <Text>To-Do List</Text>
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemContainer}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <Button title="x" onPress={() => this.deleteTask(index)} />
              </View>
              <View style={styles.hr} />
            </View>}
        />
        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text:text})}
            onSubmitEditing={this.addTask}
            value={this.state.text}
            placeholder="Add Tasks"
            returnKeyType="done"
            returnKeyLabel="done"
          />
          <Button
            style={styles.addTaskButton}
            title="Add"
            onPress={this.addTask}
          />
        </View>
      </View>
    );
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i.toString(), text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: viewPadding,
    paddingTop: 40
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  inputSection: {
    flexDirection: "row"
  },
  textInput: {
    flex: 4,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  },
  addTaskButton: {
    flex: 1
  }
});
