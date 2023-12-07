// ForgotPassword.js


import React from 'react';
import { View, Text } from 'react-native';

import SavedScreen from "./screen/SavedScreen";
import BookingsScreen from "./screen/BookingsScreen";
import ProfileScreen from "./screen/ProfileScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MainScreen from './screen/MainScreen';
import Signup from './screen/Signup';
import Login from './screen/Login';
import ForgotPassword from './screen/ForgotPassword';

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={MainScreen} options={{
          tabBarLabel: "Home", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Entypo name="home" size={24} color="black" />
          ) : (
            <AntDesign name="home" size={24} color="black" />
          ),
        }} />
        <Tab.Screen name="Saved" component={SavedScreen} options={{
          tabBarLabel: "Saved", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <AntDesign name="heart" size={24} color="black" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          ),
        }} />
        <Tab.Screen name="Bookings" component={BookingsScreen} options={{
          tabBarLabel: "Bookings", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Ionicons name="notifications" size={24} color="black" />
          ) : (
            <Ionicons name="notifications-outline" size={24} color="black" />
          ),
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: "Profile", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Ionicons name="person" size={24} color="black" />
          ) : (
            <Ionicons name="person-outline" size={24} color="black" />
          ),
        }} />

      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Main" component={BottomTabs}   options={{
          tabBarLabel: "Login", headerShown: false
        }}/>
        <Stack.Screen name="Login" options={{
          tabBarLabel: "Login", headerShown: false
        }} component={Login} />
       <Stack.Screen name="Signup" options={{
          tabBarLabel: "Signup", headerShown: false
        }} component={Signup} />
        {/* Diğer ekranlar */}
        <Stack.Screen name="Forgot" options={{
          tabBarLabel: "Forgot", headerShown: false
        }} component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
