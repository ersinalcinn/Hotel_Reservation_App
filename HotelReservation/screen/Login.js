import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup';
import MainScreen from './MainScreen';
import ForgotPassword from './ForgotPassword';
import { ScrollView,KeyboardAvoidingView,ImageBackground,StyleSheet, Text, View, TextInput , Switch, Dimensions, TouchableOpacity, KeyboardAvoidingViewComponent} from 'react-native';
const {height} = Dimensions.get("window");
const Stack = createStackNavigator();

const LoginScreen = () => {
  
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation();

  const SignupButtonPress = () => {
    navigation.navigate(Signup); // 'YeniEkran' adlı ekranın ismi
  };
  const ForgotPasswordButtonPress = () => {
    navigation.navigate(ForgotPassword); // 'YeniEkran' adlı ekranın ismi
  };
  const LoginButtonPress = () => {
    navigation.navigate(MainScreen); // 'YeniEkran' adlı ekranın ismi
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
        <TextInput placeholder="E-mail" style={styles.loginInput} />
        <TextInput placeholder="Password"   style={styles.loginInput} secureTextEntry={true}/>
        <View style={styles.container}>
        <TouchableOpacity onPress={ForgotPasswordButtonPress} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={LoginButtonPress} style={styles.buttonLogin}>
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
    height:'90%'
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
    backgroundColor: '#FD850D',
    
  },
  buttonSignup: {
    width: 350,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD850D',
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
