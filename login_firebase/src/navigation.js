import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SignUpScreen } from "./components/SignUp/signUp";
import { SignInScreen } from "./components/SingIn/SignIn";

const AppStack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name="SignUp" component={SignUpScreen} />
        <AppStack.Screen name="SignIn" component={SignInScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}