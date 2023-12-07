// SignupScreen.js

import React, { useState } from 'react';
import {Dimensions,Alert, TouchableOpacity,ImageBackground,StyleSheet,TextInput,KeyboardAvoidingView,ScrollView,View, Text, SafeAreaView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from 'firebase/app';
import { collection, addDoc,db,doc,setDoc } from "../firebase"; 

const auth = getAuth();

const {height} = Dimensions.get("window");



const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegisterButton = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        console.log("Account created.")
        Alert.alert("Account created.")
        const user = userCredential.user;
        const userUID = user.uid;
        const userEmail = user.email;
        const userDocRef = doc(db, 'users', userUID);
          try {
            await setDoc(userDocRef, { // Belge oluşturulurken setDoc kullanılır
              userUID: userUID,
              userEmail: userEmail,
              role: "user"
            });
            console.log("Document written with ID: ", userDocRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        
        console.log(user);
        navigation.navigate('Login');
        
      })
      .catch(error => {
        console.log(error)
        Alert.alert("Error", error.message); // Hata mesajını alert olarak göster
      });
  };
    

  const navigation = useNavigation();
  
  const LoginPressButton = () => {
    navigation.navigate('Login'); // 'YeniEkran' adlı ekranın ismi
  };
  

  return (
    
    <KeyboardAvoidingView 
      style={{flex:1, backgroundColor:'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       // İsteğe bağlı: Klavye boyutunu ayarlamak için
    >
      <ScrollView contentContainerStyle={{paddingBottom:100}}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="contain"
        source={require('../assets/loginBackground.jpg')}
      ></ImageBackground>
        <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
          <View style={{flexDirection:'row'}}>
          <Text>Already have an account ? 
          </Text>
          <TouchableOpacity  onPress={LoginPressButton} >
          <Text style={{fontWeight:'bold', flexDirection:'row',fontSize:15}}> Login</Text>
        </TouchableOpacity> 
       
          {/* Diğer bileşenler buraya eklenebilir */}
          
          </View>
          <View style={{flex:1, width:'80%',alignItems:'center'}}>
          
          <TextInput onChangeText={(text) => setEmail(text)} placeholder="E-mail" style={styles.inputs} />
          <TextInput onChangeText={(text) => setPassword(text)} placeholder="Password" secureTextEntry={true} style={styles.inputs} />
          
          <TouchableOpacity onPress={handleRegisterButton} style={styles.buttonLogin}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {

    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    
  },
  imageBackground: {
    height:height/2,
    backgroundColor:'white',
    borderRadius:10,
    marginTop:20,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:10,
  },
  inputs:{
   
    borderRadius: 30,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10,
    width:'80%',
  },
  buttonLogin: {
   marginTop:20,
    width: 350,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3081D0',
    
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Verdana',
  },
});