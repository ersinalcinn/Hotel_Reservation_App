import React, { useLayoutEffect, useState, useEffect } from "react";
import { getAuth,signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc,deleteDoc } from 'firebase/firestore';

import app from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View,Alert,ScrollView,StyleSheet,TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import AdminProfile from './AdminProfile';
import { Ionicons } from "@expo/vector-icons";
import UserProfile from './UserProfile';
const ExampleComponent = () => {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const editUser = (id) => {
    
    navigation.navigate('EditUser', { id });
  };

  const handleDeleteUser = (id) => {
    Alert.alert(
      'Eylemi Onayla',
      'Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress:  async () => {
              await deleteDoc(doc(firestore, "users", id));
              Alert.alert("This record deleted.");
              navigation.replace('Main','AdminUserPanel');
          
          },
        },
      ],
      { cancelable: false }
    );
    
  };

 

 
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const userList = [];
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, data: doc.data() });
          
        });
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };
   

    fetchUsers();
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
 

  return (
    <ScrollView>
      {users.map((user) => (
        
        <View key={user.id} style={styles.userContainer}>
          {/* Kullanıcı fotoğrafı */}
          
          <View style={styles.userInfo}>
            <Text style={{fontWeight:'bold',fontSize:16,marginBottom:10}}>User Details:</Text>
            <Text style={styles.email}>User ID: {user.data.userUID}</Text>
            <Text style={styles.email}>User Email: {user.data.userEmail}</Text>
            <Text style={styles.email}>User Role: {user.data.role}</Text>
            
            
          
          
            <TouchableOpacity onPress={() => editUser(user.id)} style={styles.detailsButton}>
                <Text style={styles.detailsText}>Update Role</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteUser(user.id)} style={styles.detailsButton}>
                <Text style={styles.detailsText}>Delete User</Text>
              </TouchableOpacity>
              
              
            
            </View>
        </View>
        
      
    ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: '#3081D0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    
  },
  detailsText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
    margin:10,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    color: '#555',
    marginBottom: 5,
  },
});
export default ExampleComponent;
