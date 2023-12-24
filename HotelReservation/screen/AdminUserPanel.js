import React, { useLayoutEffect, useState, useEffect } from "react";
import { getAuth,signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';
import { useNavigation, useRoute } from "@react-navigation/native";
import { View,StyleSheet,TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import AdminProfile from './AdminProfile';
import { Ionicons } from "@expo/vector-icons";
import UserProfile from './UserProfile';
const ExampleComponent = () => {
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const handleListUser = () => {

    navigation.navigate('ListAllUsers');

  };

  const handleUserDelete = () => {
    navigation.navigate('DeleteUser');
  };

  const handleUserEdit = () => {
    navigation.navigate('UpdateUser');
  };

  const handleLogOut = () => {
    signOut(auth).then(() => {
      Alert.alert("Sign out succesfull.");
      navigation.navigate("Login");
    }).catch((error) => {
      Alert.alert("Error");
    });
  };
  const navigation = useNavigation();
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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "User Panel",
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
  // Kullanıcı rolüne göre view döndür
  const renderViewByRole = () => {
    
      return (
        <View style={{marginTop:'10%', alignItems:'center', justifyContent:'center'}}>
          <Text style={{flexDirection:'column'}}>Welcome, {userRole}</Text>
          <Text style={{flexDirection:'column',marginTop:5,marginBottom:30,}}>{userEmail}</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
          </View>
      
      );
    
  };

  return (
    <View>
      {userRole ? (
        renderViewByRole() // Kullanıcı rolüne göre view döndür
      ) : (
        <ActivityIndicator size="large" color="#0000ff" /> // Rol bilgisi yüklenirken gösterilecek loading indicator
      )}
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
export default ExampleComponent;
