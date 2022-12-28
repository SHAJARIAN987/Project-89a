import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Switch,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

/*
import * as firebase from "firebase";
import { firebaseConfig } from "./config";
*/

let customFonts = {
  'Bubblegum-Sans': require('./Roboto-Thin.ttf'),
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: '',
      lightTheme: '',
      fontsLoaded: '',
      name: '',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  toggleSwitch() {
    const previous_state = this.state.isEnabled;
    const theme = !this.isEnabled ? 'dark' : 'light';
    var update = {};
    updates['/users/' + firebase.auth().currentUser.uid + '/current_theme/'] =
      theme;
    firebase.database().ref().update(updates);
    this.setState({ isEnabled: !previous_state, lightTheme: previous_state });
  }

  async fetchUser() {
    let theme, name;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
      });
    this.setState({
      light_theme: theme === 'light' ? true : false,
      isEnabled: theme === 'light' ? false : true,
      name: name,
    });
  }

  render() {
    return (
      <View
        style={
          this.state.lightTheme ? styles.containerLight : styles.container
        }>
        <SafeAreaView styles={styles.droidSafeArea} />
        <View style={styles.headerContainer}>
          <Image source={require('./Yoga.jpeg')} style={styles.logoImage} />
          <Text
            style={this.state.lightTheme ? styles.headerLight : styles.header}>
            Spectagram App
          </Text>
          <Text
            style={
              this.state.lightTheme ? styles.subheaderLight : styles.subheader
            }>
            Hello, {this.state.name}
          </Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            style={switchx}
            trackColor={{ false: '#767577', true: 'white' }}
            thumbColor={this.state.isEnabled ? '#ee8249' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => this.toggleSwitch()}
            value={this.state.isEnabled}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  header: { backgroundColor: 'white' },
  subheader: { backgroundColor: 'white' },
  headerLight: { backgroundColor: 'black' },
  subheaderLight: { backgroundColor: 'black' },
  headerContainer: {},
  logoImage: {},
  droidSafeArea: {},
  switchContainer: {},
  switchx: { transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] },
});
