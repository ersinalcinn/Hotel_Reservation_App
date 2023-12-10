import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const AddRoom = () => {
  const [roomType, setRoomType] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [capacity, setCapacity] = useState('');
  const [capacityChildren, setCapacityChildren] = useState('');
  const [roomFeatures, setRoomFeatures] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageURL(result.uri);
    }
  };

  const addNewRoom = async (roomData) => {
    try {
      const docRef = await addDoc(collection(db, 'rooms'), roomData);
    } catch (error) {
      console.error('Belge eklenirken hata oluştu:', error);
    }
  };

  const handleCreateRoom = async () => {
    if (imageURL) {
      try {
        setUploading(true);

        const fileUri = imageURL;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        const fileBlob = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const storageRef = ref(storage, 'room_images/' + fileInfo.name);

        await uploadBytes(storageRef, fileBlob, { contentType: 'image/jpeg' });

        const downloadURL = await getDownloadURL(storageRef);
        setImageURL(downloadURL);

        setUploading(false);

        const newRoom = {
          imageURL: downloadURL,
          roomType,
          pricePerNight,
          capacity,
          capacityChildren,
          roomFeatures: roomFeatures.split(',').map((feature) => feature.trim()),
        };

        addNewRoom(newRoom);
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploading(false);
      }
    } else {
      console.log('Please select an image');
    }
  };

  return (
    <View style={styles.container}>
      {/* ... diğer form girdileri */}
      <TouchableOpacity onPress={handleChooseImage} style={styles.createButton}>
        <Text style={styles.createText}>Choose Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateRoom} style={styles.createButton}>
        <Text style={styles.createText}>Create Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Stil tanımları burada
});

export default AddRoom;
