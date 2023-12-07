import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const UserProfile = () => {
  const handleEditAccount = () => {
    console.log('Edit your account');
  };
  const handleBooking = () => {
    console.log('All Bookings');
  };
  const handleLogOut = () => {
    console.log('Log Out');
  };

  

  return (
   
       
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>ALL BOOKINGS</Text>
      </TouchableOpacity>
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
