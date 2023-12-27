import React, { useState } from 'react';
import { Alert,View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import app from '../firebase'; // Firebase bağlantınızı buraya ekleyin
import { collection, getDocs,deleteDoc,doc,updateDoc, } from "firebase/firestore";
import { getAuth ,deleteUser,getUserData} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useNavigation,useRoute} from '@react-navigation/native';
const EditUser = ({ route }) => {
  const [selectedRole, setSelectedRole] = useState('user'); // Varsayılan olarak 'user' rolü seçili
  const navigation = useNavigation();
  const auth = getAuth(app);
  const { id } = route.params;
const firestore = getFirestore(app);
  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleSaveRole = async () => {
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
                try {
                    const userRole = doc(firestore, "users",id);
            
                    // Set the "capital" field of the city 'DC'
                    await updateDoc(userRole, {
                      role: selectedRole
                    });
                    Alert.alert("This record updated.");
                    navigation.replace('Main','UpdateUserPanel');
                  
                } catch (error) {
                  console.error('Rol güncelleme hatası:', error);
                }
            
            },
          },
        ],
        { cancelable: false }
      );
   
    
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.roleButton, selectedRole === 'admin' ? styles.selectedRole : null]}
        onPress={() => handleRoleChange('admin')}
      >
        <Text style={styles.roleText}>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.roleButton, selectedRole === 'user' ? styles.selectedRole : null]}
        onPress={() => handleRoleChange('user')}
      >
        <Text style={styles.roleText}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveRole}
      >
        <Text style={styles.saveButtonText}>Rolü Kaydet</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleButton: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  roleText: {
    fontSize: 18,
  },
  selectedRole: {
    backgroundColor: 'lightblue',
  },
  saveButton: {
    
    padding: 10,
    backgroundColor: '#3081D0',
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default EditUser;
