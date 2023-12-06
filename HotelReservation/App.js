import React from 'react';
import { SafeAreaView,StyleSheet,Text } from 'react-native';
import MainScreen from './screen/MainScreen';
import Signup from './screen/Signup';
import Login from './screen/Login';
import ForgotPassword from './screen/ForgotPassword';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack=createStackNavigator();


export default function App() {
  
  return (
    <NavigationContainer  >
      <Stack.Navigator initialRouteName="Login" >

      <Stack.Screen
      name="SignupScreen"
      component={Signup}
      options={{
        title: 'Sign Up',
        headerBackTitle: 'Login', 
        headerShown:true,
        
      }}
      />
     
  {/* Diğer ekranlar */}
      <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
      <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown:false}} /> 
      <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        title: 'Forgot Password',
        headerBackTitle: 'Login', 
        headerShown:true,
        // Geri butonunun metni
        // veya
        // headerBackTitleVisible: false, // Geri butonunun metni gizleme
      }}
      />
      </Stack.Navigator>
      </NavigationContainer>
  );
 
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    
    
  }
});