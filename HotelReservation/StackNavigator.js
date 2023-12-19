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
import ListAllUsers from './screen/ListAllUsers';
import DeleteUser from './screen/DeleteUser';
import UpdateUser from './screen/UpdateUser';
import EditUser from './screen/EditUser';
import AddRoom from './screen/AddRoom';
import UpdateRoom from './screen/UpdateRoom';
import SearchBooking from './screen/SearchBooking';
import EditProfile from './screen/EditProfile';
import UserProfile from './screen/UserProfile';
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
        <Tab.Screen name="SavedScreen" component={SavedScreen} options={{
          tabBarLabel: "SavedScreen", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
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
        <Stack.Screen name="ListAllUsers" options={{
          tabBarLabel: "ListAllUsers", headerBackTitle:"Profile",headerTitle:"List All Users" ,headerShown: true
        }} component={ListAllUsers} />
        <Stack.Screen name="DeleteUser" options={{
          tabBarLabel: "DeleteUser", headerBackTitle:"Profile",headerTitle:"Delete a User" ,headerShown: true
        }} component={DeleteUser} />
        <Stack.Screen name="UpdateUser" options={{
          tabBarLabel: "UpdateUser", headerBackTitle:"Profile",headerTitle:"Update a User" ,headerShown: true
        }} component={UpdateUser} />
        <Stack.Screen name="EditUser" options={{
          tabBarLabel: "EditUser", headerBackTitle:"Profile",headerTitle:"Edit User" ,headerShown: true
        }} component={EditUser} />
        <Stack.Screen name="AddRoom" options={{
          tabBarLabel: "AddRoom", headerBackTitle:"Profile",headerTitle:"Add a Room" ,headerShown: true
        }} component={AddRoom} />
        <Stack.Screen name="UpdateRoom" options={{
          tabBarLabel: "UpdateRoom", headerBackTitle:"Profile",headerTitle:"Update a Room" ,headerShown: true
        }} component={UpdateRoom} />
        <Stack.Screen name="SearchBooking" options={{
          tabBarLabel: "SearchBooking", headerBackTitle:"Reservation",headerTitle:"Search Booking" ,headerShown: true
        }} component={SearchBooking} />
         <Stack.Screen name="EditProfile" options={{
          tabBarLabel: "EditProfile",headerBackTitle:"Profile",headerTitle:"Edit Profile" ,headerShown: true
        }} component={EditProfile} />
        
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
