import React from 'react';
import { SafeAreaView,StyleSheet,Text } from 'react-native';
import MainScreen from './screen/MainScreen';
import Signup from './screen/Signup';
import Login from './screen/Login';
import ForgotPassword from './screen/ForgotPassword';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from './StackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack=createStackNavigator();


export default function App() {
  
  return (
    <StackNavigator />
  );
 
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    
    
  }
});