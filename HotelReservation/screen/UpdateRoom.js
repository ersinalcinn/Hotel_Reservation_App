import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, db } from '../firebase';
import { getStorage,uploadBytesResumable, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import app from '../firebase'; // Firebase bağlantınızı buraya ekleyin

const AddRoom = () => {
  const navigation = useNavigation();
  const [roomType, setRoomType] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [capacity, setCapacity] = useState('');
  const [capacityChildren, setCapacityChildren] = useState('');
  const [roomFeatures, setRoomFeatures] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrlFirebase, setDownloadUrlFirebase] = useState('');
  const storage=getStorage(app);
  const getBlobFromUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    return blob;
  };
  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageURL(result.assets[0].uri);
      if (imageURL) {
        setUploading(true); // Yükleme başladı
        const blob = await getBlobFromUri(imageURL);
        const uniqueId = uuidv4().replace(/-/g, '');
       const storageRef = ref(storage, `/images/${uniqueId}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);
  
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      setUploading(false);
      console.error('Error uploading file: ', error);
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      setUploading(false);
      Alert.alert("File uploaded.");
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setDownloadUrlFirebase(downloadURL);
      });
    }
  );
      } else {
        console.log('Please select an image');
      }
    }
  };

  const addNewRoom = async (roomData) => {
    try {
      const docRef = await addDoc(collection(db, 'rooms'), roomData);
      Alert.alert("Room was created.");
      navigation.navigate('ListAllUsers');
      
    } catch (error) {
      console.error('Belge eklenirken hata oluştu:', error);
    }
  };

  const handleCreateRoom = async () => {
    if (roomType && pricePerNight && capacity && capacityChildren && roomFeatures && imageURL) {
      const newRoomData = {
        roomType,
        pricePerNight,
        capacity,
        capacityChildren,
        roomFeatures: roomFeatures.split(',').map(feature => feature.trim()),
        downloadUrlFirebase,
      };

      addNewRoom(newRoomData);
    } else {
      Alert.alert('Please fill all fields and select an image');
    }
  };
    

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Room Type:</Text>
      <TextInput
        style={styles.input}
        value={roomType}
        onChangeText={text => setRoomType(text)}
      />

      <Text style={styles.label}>Price Per Night:</Text>
      <TextInput
        style={styles.input}
        value={pricePerNight}
        onChangeText={text => setPricePerNight(text)}
      />

      <Text style={styles.label}>Capacity:</Text>
      <TextInput
        style={styles.input}
        value={capacity}
        onChangeText={text => setCapacity(text)}
      />

      <Text style={styles.label}>Capacity Children:</Text>
      <TextInput
        style={styles.input}
        value={capacityChildren}
        onChangeText={text => setCapacityChildren(text)}
      />

      <Text style={styles.label}>Room Features (comma separated):</Text>
      <TextInput
        style={styles.input}
        value={roomFeatures}
        onChangeText={text => setRoomFeatures(text)}
      />

      <TouchableOpacity onPress={handleChooseImage} style={styles.createButton}>
        <Text style={styles.createText}>Choose Image</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={uploading} onPress={handleCreateRoom} style={styles.createButton}>
        <Text style={styles.createText}>Create Room</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#3081D0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AddRoom;
