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
  SafeAreaView,
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
      pass: '',
      email: '',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  login = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace('DashboardScreen');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View styles={styles.container}>
          <SafeAreaView styles={styles.droidSafeArea} />
          <View styles={styles.headerContainer}>
            <Image source={require('./Yoga.jpeg')} style={styles.logoImage} />
            <Text style={styles.header}>Spectagram</Text>
            <Text style={styles.subheader}>Login</Text>
          </View>
          <View styles={styles.textInputs}>
            <TextInput
              placeHolder={'Email'}
              style={styles.textInputEmail}
              onChangetext={(text) => this.setState({ email: text })}
              autoFocus></TextInput>
            <TextInput
              placeHolder={'Password'}
              style={styles.textInputPassword}
              onChangetext={(text) =>
                this.setState({ pass: text })
              }></TextInput>
            secureTextEntry
          </View>
          <View style={styles.enterButtonContainer}>
            <TouchableOpacity
              styles={styles.enterButton}
              onPress={this.login()}>
              Sign in With Google
            </TouchableOpacity>
            <Image source={require('./googleLogo.png')} style={styles.logoImage} />
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
  enterButton: {},
  logoImage: {},
  enterButtonContainer: {},
  droidSafeArea: {},
});
