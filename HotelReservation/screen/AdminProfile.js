import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';


import ListAllUsers from "./ListAllUsers";

const AdminProfile = () => {
    const navigation = useNavigation();
  const handleListUser =  () => {
    
        navigation.navigate('ListAllUsers');
    
  };

  const handleUserDelete = () => {
    navigation.navigate('DeleteUser');
  };

  const handleUserEdit = () => {
    navigation.navigate('UpdateUser');
  };

  const handleHotelAdd = () => {
    console.log('Otel ekleme işlemi');
  };

  const handleHotelDelete = () => {
    console.log('Otel silme işlemi');
  };

  const handleHotelEdit = () => {
    console.log('Otel düzenleme işlemi');
  };

  return (
   
       
    <View style={styles.container}>
        
      <TouchableOpacity style={styles.button} onPress={handleListUser}>
        <Text style={styles.buttonText}>LIST ALL USERS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUserDelete}>
        <Text style={styles.buttonText}>DELETE A USER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUserEdit}>
        <Text style={styles.buttonText}>UPDATE A USER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleHotelAdd}>
        <Text style={styles.buttonText}>ADD A ROOM</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleHotelDelete}>
        <Text style={styles.buttonText}>DELETE A ROOM</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleHotelEdit}>
        <Text style={styles.buttonText}>UPDATE A ROOM</Text>
      </TouchableOpacity>
    </View>
     
  );
};

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3081D0',
    padding: 15,
    margin: 10,
    width: 200,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminProfile;
