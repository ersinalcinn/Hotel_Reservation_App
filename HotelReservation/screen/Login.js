import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

import Signup from './Signup';
import MainScreen from './MainScreen';
import ForgotPassword from './ForgotPassword';
import { Alert,ScrollView,KeyboardAvoidingView,ImageBackground,StyleSheet, Text, View, TextInput , Switch, Dimensions, TouchableOpacity, KeyboardAvoidingViewComponent} from 'react-native';

import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from '../firebase';

const auth = getAuth();
const {height} = Dimensions.get("window");


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginButton = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account created.")
        Alert.alert("Login Succesfull.")
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('MainScreen');
      })
      .catch(error => {
        console.log(error)
        Alert.alert("Error", error.message); // Hata mesajını alert olarak göster
      });
  };
  
  
  const navigation = useNavigation();

  const SignupButtonPress = () => {
    navigation.navigate(Signup); // 'YeniEkran' adlı ekranın ismi
  };
  const ForgotPasswordButtonPress = () => {
    navigation.navigate(ForgotPassword); // 'YeniEkran' adlı ekranın ismi
  };
 
  
  return (

    <KeyboardAvoidingView 
      style={{flex:1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       // İsteğe bağlı: Klavye boyutunu ayarlamak için
    ><ImageBackground
        style={styles.imageBackground}
        resizeMode="contain"
        source={require('../assets/loginBackground.jpg')}
      ></ImageBackground>
      
      <View style={styles.container}>
        <Text style={styles.title}>Hello,</Text>
        <Text style={styles.subTitle}>Sign In to your account</Text>
        <TextInput onChangeText={text =>setEmail(text)} value={email} placeholder="E-mail" style={styles.loginInput} />
        <TextInput onChangeText={text =>setPassword(text)} value={password} placeholder="Password"   style={styles.loginInput} secureTextEntry={true}/>
        <View style={styles.container}>
        <TouchableOpacity onPress={ForgotPasswordButtonPress} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleLoginButton} style={styles.buttonLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={SignupButtonPress} style={styles.buttonSignup}>
          <Text style={styles.buttonText}  >SIGN UP</Text>
        </TouchableOpacity>
      </View>
        </View>
        </View>
        <StatusBar style="auto" />
      
    </KeyboardAvoidingView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    height:'50%'
    
  },
  imageBackground: {
    flex:1,
    marginTop:10,
    height:'100%',
    backgroundColor:'white',
    
  },
  title: {
    marginTop:-20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181818',
    fontFamily: 'Verdana',
    
  },
  subTitle: {
    fontSize: 15,
    color: 'gray',
    fontFamily: 'Verdana',
    
  },
  loginInput: {
    borderRadius: 30,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '80%',
    marginTop: 10,
    
  },
  forgotPassword: {
    marginBottom:10,
    marginLeft: '50%',
    marginTop:20,
    
  },
  forgotPasswordText: {
    color: 'gray',
  },
  buttonsContainer: {
   
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '10%',
    marginTop:10,
  },
  buttonLogin: {
   
    width: 350,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#145ce2',
    
  },
  buttonSignup: {
    width: 350,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#145ce2',
    marginTop:10,
    marginBottom:15,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Verdana',
  },
});

export default LoginScreen;