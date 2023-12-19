import React, { useState } from 'react';
import { View,TouchableOpacity,Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, updatePassword,onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';
import { useNavigation, useRoute } from "@react-navigation/native";
const PasswordChangeScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const auth = getAuth(app);
  const navigation = useNavigation();

  const firestore = getFirestore(app);
  const handlePasswordChange = () => {
    const user = auth.currentUser;
    
  
        // Yeni şifrelerin eşleştiğini ve en az 6 karakter uzunluğunda olduğunu kontrol etme
        if (newPassword === confirmNewPassword && newPassword.length >= 6) {
          // Yeni şifreyi Firebase'e güncelleme
          updatePassword(user,newPassword)
            .then(() => {
              
              Alert.alert('Başarılı', 'Şifre başarıyla güncellendi');
              setNewPassword('');
              setConfirmNewPassword('');
              navigation.navigate("Profile");
            })
            .catch((error) => {
              Alert.alert('Hata', 'Şifre güncelleme işlemi başarısız: ' + error.message);
            });
        } else {
          Alert.alert('Hata', 'Yeni şifreler eşleşmiyor veya en az 6 karakter olmalı');
        }
      
    
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,fontWeight:'bold',marginBottom:10}}>New Password : </Text>
      <TextInput
        placeholder="Yeni Şifre"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        style={styles.input}
      />
      <Text style={{fontSize:20,fontWeight:'bold',marginBottom:10}}>Verify New Password : </Text>
      <TextInput
        placeholder="Yeni Şifre (Tekrar)"
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={(text) => setConfirmNewPassword(text)}
        style={styles.input}
      />
       <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        <Text style={{color: 'white',
    fontWeight: 'bold',}}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#3081D0',
    padding: 15,
    margin: 10,
    width: 200,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default PasswordChangeScreen;
