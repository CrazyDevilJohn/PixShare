import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import {
  HomeScreen,
  ItemScreen,
  Items,
  OnBordingScreen,
} from "./Screens/Index";
import "react-native-url-polyfill/auto";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

const App = (props) => {
  useEffect(() => {
    StatusBar.setBackgroundColor("#ffffff00");
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBordingScreen" component={OnBordingScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Items" component={Items} />
        <Stack.Screen name="ItemScreen" component={ItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
