import React, { useLayoutEffect, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, ActivityIndicator } from 'react-native';
import AdminProfile from './AdminProfile';
import { Ionicons } from "@expo/vector-icons";
import UserProfile from './UserProfile';
const ExampleComponent = () => {
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

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
      } else {
        console.log('Kullanıcı oturumu açmış değil.');
      }
    });

    return () => unsubscribe();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Profile",
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
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);
  // Kullanıcı rolüne göre view döndür
  const renderViewByRole = () => {
    if (userRole === 'admin') {
      return (
        <View style={{marginTop:'50%', alignItems:'center', justifyContent:'center'}}>
          <Text style={{flexDirection:'column'}}>Welcome, {userRole}</Text>
          <Text style={{flexDirection:'column',marginTop:5,marginBottom:30,}}>{userEmail}</Text>
          <AdminProfile/>
          </View>
      
      );
    } else if (userRole === 'user') {
      return (
        <View style={{marginTop:'70%', alignItems:'center', justifyContent:'center'}}>
          <Text style={{flexDirection:'column'}}>Welcome, {userRole}</Text>
          <Text style={{flexDirection:'column',marginTop:5,marginBottom:30,}}>{userEmail}</Text>
          <UserProfile/>
          </View>
      
      );
    } else {
      return <Text>Bilinmeyen Rol</Text>;
    }
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

export default ExampleComponent;
