import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './src/components/Home/HomeScreen';
import { ProfileScreen } from './src/components/Profile/ProfileScreen';
import { SignUpScreen } from './src/components/SignUp/signUp';
import { SignInScreen } from './src/components/SingIn/SignIn';

import { initializeApp } from 'firebase/app';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyAuiC-WKDO10nd_OwdKsgOcYtVneBHF93M",
  authDomain: "boto-fe.firebaseapp.com",
  projectId: "boto-fe",
  storageBucket: "boto-fe.appspot.com",
  messagingSenderId: "474778040903",
  appId: "1:474778040903:web:e0cdfa6a5b37f87b490f62"
};

const firebaseApp = initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='SignIn' component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#888888',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
