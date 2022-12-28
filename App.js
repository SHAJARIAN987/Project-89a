import * as React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import RegisterScreen from './RegisterScreen';
import LoginScreen from './Login';
import DashboardScreen from './DashboardScreen';
/*
import * as firebase from "firebase";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
*/
const AppSwitchNavigator = createSwitchNavigator({
  RegisterScreen: RegisterScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return <AppNavigator />;
}
