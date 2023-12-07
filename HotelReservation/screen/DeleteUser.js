import React, { useEffect, useState } from 'react';
import { Alert,TouchableOpacity, ScrollView, View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import app from "../firebase";

import { collection, getDocs,deleteDoc,doc } from "firebase/firestore";
import { getAuth ,deleteUser,getUserData} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const columnWidth = width / 3 - 10; // Sütun genişlikleri

const DeleteUser = () => {
    const navigation = useNavigation();
    const auth = getAuth(app);
   
  const firestore = getFirestore(app);
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
                navigation.navigate('DeleteUser');
            
            },
          },
        ],
        { cancelable: false }
      );
  };
  
  const [users, setUsers] = useState([]);
  

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

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.column, styles.emailColumn]}>{item.data.userEmail}</Text>
      <Text style={[styles.column, styles.roleColumn]}>{item.data.role}</Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => handleDeleteUser(item.data.userUID)}
      >
        <Text style={styles.actionButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.tableHeader}>
              <Text style={[styles.columnHeader, styles.emailColumn]}>Email</Text>
              <Text style={[styles.columnHeader, styles.roleColumn]}>Role</Text>
              <Text style={[styles.columnHeader, styles.roleColumn]}>Action</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 10,
  },
  tableHeader: {
    
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingVertical: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  emailColumn: {
    width: columnWidth, // E-posta sütunun genişliği
  },
  roleColumn: {
    width: columnWidth, // Rol sütunun genişliği
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 10,
  },
  column: {
    flex: 1,
    paddingVertical: 5,
    textAlign: 'center',
  },
  actionButton: {
    width: columnWidth,
    backgroundColor: '#3081D0',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 5,
    
  },
  actionButtonText: {
    color:'white',
    textAlign: 'center',
    padding:10,
  },
});

export default DeleteUser;
