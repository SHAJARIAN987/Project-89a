import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
/*
import * as firebase from "firebase";
import { firebaseConfig } from "./config";
*/

let customFonts = {
  'Bubblegum-Sans': require('./Roboto-Thin.ttf'),
};

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  register = (email, password, confirmPassword, fn, ln) => {
    if (password == confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          Alert.alert('User Registered!');
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    } else {
      Alert.alert("Passwords don't match!");
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View styles={styles.container}>
          <View styles={styles.headerContainer}>
            <Text style={styles.header}>Spectagram</Text>
            <Text style={styles.subheader}>Login</Text>
          </View>
          <View styles={styles.textInputs}>
            <TextInput
              placeHolder={'Email'}
              style={styles.textInputEmail}></TextInput>
            <TextInput
              placeHolder={'Password'}
              style={styles.textInputPassword}></TextInput>
            <TextInput
              placeHolder={'First Name'}
              style={styles.textInputFN}></TextInput>
            <TextInput
              placeHolder={'Last Name'}
              style={styles.textInputLN}></TextInput>
          </View>
          <View styles={styles.enterButton} onPress={this.register()}>
            Enter
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 20,
    color: 'white',
  },
  headerContainer: {},
  subheader: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 10,
    color: 'white',
  },
  textInputs: {},
  textInputEmail: {},
  textInputPassword: {},
  textInputFN: {},
  textInputLN: {},
  enterButton: {},
});
