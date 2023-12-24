import React, { useLayoutEffect, useState, useEffect } from "react";
import { View,StyleSheet,Text, TouchableOpacity,TextInput, Button, Alert } from 'react-native';
import app from '../firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const handleResetPassword = () => {
    const auth = getAuth(app);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Password reset email sent.");
        navigation.navigate('Login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Reset Password",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#3081D0",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      
    });
  }, []);
  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="E-posta adresinizi girin"
      keyboardType="email-address"
      onChangeText={(text) => setEmail(text)}
      value={email}
    />
    <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
      <Text style={styles.buttonText}>Reset Password</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius:6,
  },
  button: {
    backgroundColor: '#3081D0',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
