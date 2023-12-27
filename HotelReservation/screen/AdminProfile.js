import React from 'react';
import { Alert,View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth,signOut, updatePassword,onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';
const UserProfile = () => {
  const navigation = useNavigation();
  const auth = getAuth(app);
  const handleEditAccount = () => {
    navigation.navigate('EditProfile');
  };
  
  const handleLogOut = () => {
    signOut(auth).then(() => {
      Alert.alert("Sign out succesfull.");
      navigation.navigate("Login");
    }).catch((error) => {
      Alert.alert("Error");
    });
  };
  return (
   
       
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.button} onPress={handleEditAccount}>
        <Text style={styles.buttonText}>EDIT YOUR ACCOUNT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>LOG OUT</Text>
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

export default UserProfile;
