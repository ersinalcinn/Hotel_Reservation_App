import React, { useEffect, useState } from 'react';
import { ScrollView,View, Text, FlatList, StyleSheet } from 'react-native';
import app from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
const ListAllUsers = () => {
  const [users, setUsers] = useState([]);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
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
    <View style={styles.tableRow} key={item.id}>
      <Text style={styles.column}>{item.data.userEmail}</Text>
      <Text style={styles.column}>{item.data.role}</Text>
     
      {/* Diğer sütunları burada ekleyebilirsiniz */}
    </View>
    
  );

  return (
    // Array'in ilk elemanını konsola yazdırır

    <View style={styles.container}>
        
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Email</Text>
            {/* Diğer sütun başlıklarını burada ekleyebilirsiniz */}
            <Text style={styles.columnHeader}>Role</Text>
          </View>
          
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    flex: 1,
    padding: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000', // Renk ve diğer özellikler burada düzenlenebilir
    paddingVertical: 5,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000', // Hücre çizgisi rengi
    paddingVertical: 5,
    
  },
  column: {
    flex: 1,
    textAlign: 'center',
  },
});

export default ListAllUsers;