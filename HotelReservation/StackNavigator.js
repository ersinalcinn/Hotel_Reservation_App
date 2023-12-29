// ForgotPassword.js


import React, { useLayoutEffect, useState, useEffect } from "react";
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
import { Feather } from '@expo/vector-icons';
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
import AdminRoomPanel from './screen/AdminRoomPanel';
import AdminUserPanel from './screen/AdminUserPanel';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from './firebase';
const StackNavigator = () => {

  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Kullanıcı oturumu varsa Firestore'dan rolü al
        const userDocRef = doc(firestore, 'users', user.uid); // Kullanıcının rol bilgisinin saklandığı Firestore koleksiyonu ve belge referansı
        try {
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserRole(userData.role); // Kullanıcının rol bilgisini state'e kaydet
            setUserEmail(userData.userEmail);
          } else {
            console.log('Kullanıcı rol bilgisi bulunamadı.');
          }
        } catch (error) {
          console.error('Firestore rol bilgisi alma hatası:', error);
        }
      } 
    });

    return () => unsubscribe();
  }, []);
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  function AdminTabs() {
    
    return (
      <Tab.Navigator>
        <Tab.Screen name="UserPanel" component={AdminUserPanel} options={{
          tabBarLabel: "User", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Feather name="user" size={24} color="black" />
          ) : (
            <Feather name="user" size={24} color="black" />
          ),
        }} />
        <Tab.Screen name="RoomPanel" component={AdminRoomPanel} options={{
          tabBarLabel: "Room", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Feather name="home" size={24} color="black" />
          ) : (
            <Feather name="home" size={24} color="black" />
          ),
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: "Profile", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Ionicons name="person" size={24} color="black" />
          ) : (
            <Ionicons name="person-outline" size={24} color="black" />
          ),
        }} />
        {/* ... Diğer Admin tab'leri */}
      </Tab.Navigator>
    );
  }
  function BottomTabs() {
    console.log(userRole);
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
       
      {userRole === 'admin' ? (
          <Stack.Screen name="Main" component={AdminTabs} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        )}
        
        <Stack.Screen name="Login" options={{
          tabBarLabel: "Login", headerShown: false
        }} component={Login} />
       <Stack.Screen name="Signup" options={{
          tabBarLabel: "Signup", headerBackTitleVisible: true,headerTintColor: 'white',headerBackTitle:'Login',headerShown: true
        }} component={Signup} />
        {/* Diğer ekranlar */}
        <Stack.Screen name="Forgot" options={{
          tabBarLabel: "Forgot", headerBackTitleVisible: true,headerTintColor: 'white',headerBackTitle:'Login'
        }} component={ForgotPassword} />
        <Stack.Screen name="ListAllUsers" options={{
          tabBarLabel: "ListAllUsers", headerBackTitle:"User Panel",headerTitle:"List All Users" ,headerShown: true
        }} component={ListAllUsers} />
        <Stack.Screen name="DeleteUser" options={{
          tabBarLabel: "DeleteUser", headerBackTitle:"User Panel",headerTitle:"Delete a User" ,headerShown: true
        }} component={DeleteUser} />
        <Stack.Screen name="UpdateUser" options={{
          tabBarLabel: "UpdateUser", headerBackTitle:"User Panel",headerTitle:"Update a User" ,headerShown: true
        }} component={UpdateUser} />
        <Stack.Screen name="EditUser" options={{
          tabBarLabel: "EditUser", headerBackTitle:"User Panel",headerTitle:"Edit User" ,headerShown: true
        }} component={EditUser} />
        <Stack.Screen name="AddRoom" options={{
          tabBarLabel: "AddRoom", headerBackTitle:"Room Panel",headerTitle:"Add a Room" ,headerShown: true
        }} component={AddRoom} />
        <Stack.Screen name="UpdateRoom" options={{
          tabBarLabel: "UpdateRoom", headerBackTitle:"Room Panel",headerTitle:"Update a Room" ,headerShown: true
        }} component={UpdateRoom} />
        <Stack.Screen name="SearchBooking" options={{
          tabBarLabel: "SearchBooking",headerTintColor: 'white', headerBackTitle:"Reservation",headerTitle:"Search Booking" ,headerShown: true
        }} component={SearchBooking} />
         <Stack.Screen name="EditProfile" options={{
          tabBarLabel: "EditProfile",headerBackTitle:"Profile",headerTitle:"Edit Profile" ,headerShown: true
        }} component={EditProfile} />
        <Stack.Screen name="AdminUserPanel" options={{
          tabBarLabel: "Admin User Panel"
        }} component={AdminUserPanel} />
        <Stack.Screen name="AdminRoomPanel" options={{
          tabBarLabel: "Adming Room Panel"
        }} component={AdminRoomPanel} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
