import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  SectionList,
  Alert,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useFocusEffect } from '@react-navigation/native';

import { collection, query, where, getDocs,updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';


const deviceHeight = Dimensions.get('window').width;
const deviceWidth = Dimensions.get('window').width;
const SavedScreen = () => {
  const auth = getAuth(app);


  const firestore = getFirestore(app);
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [selectedDates, setSelectedDates] = useState();
  const route = useRoute();
  const [selectedAdults, setSelectedAdults] = useState('');
  const [selectedChildren, setSelectedChildren] = useState('');
  const [likedRooms, setLikedRooms] = useState([]);
  const [userID,setUserID]=useState(['']);
  const openDetails = (roomId) => {
    navigation.navigate('RoomDetail', roomId);
  };
  
  const toggleLike =async  (roomId) => {
    
    const isLiked = likedRooms.includes(roomId);
    const index = likedRooms.indexOf(roomId); // Odanın index'ini al
    
    if (isLiked) {
     if (index !== -1) {
      const newLikedRooms = [...likedRooms]; // likedRooms'un bir kopyasını oluştur
      newLikedRooms.splice(index, 1); // Belirtilen index'teki 1 öğeyi sil
      
      setLikedRooms(newLikedRooms); // Yeni diziyi state'e atayın veya kullanımınıza göre güncelleyin
      const docRef = doc(firestore, "users", userID);
      
        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef, {
          likedRooms: newLikedRooms
        });
    }
    } else {
      const newLikedRooms = [...likedRooms]; // likedRooms'un bir kopyasını oluştur
        newLikedRooms.push(roomId); // Belirtilen index'teki 1 öğeyi sil
        
        setLikedRooms(newLikedRooms); // Yeni diziyi state'e atayın veya kullanımınıza göre güncelleyin
        
        const docRef = doc(firestore, "users", userID);

          // Set the "capital" field of the city 'DC'
          await updateDoc(docRef, {
            likedRooms: newLikedRooms
          });
    }
    
  };
  
  useEffect(() => {
    const fetchRooms = async () => {
    
      try {
        const userList = [];
        for (const roomId of likedRooms) {
          const roomDocRef = doc(firestore, 'rooms', roomId);
          const roomDocSnap = await getDoc(roomDocRef);
          if (roomDocSnap.exists()) {
            userList.push({ id: roomDocSnap.id, data: roomDocSnap.data() });
          }
        }
        setRooms(userList);
      } catch (error) {
        console.error('Error fetching rooms: ', error);
      }
    };
    fetchRooms(); 
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);

        const fetchLikedRooms = async () => {
          try {
            const docRef = doc(firestore, "users", user.uid);
            const docSnap = await getDoc(docRef);
            
            setLikedRooms(docSnap.data().likedRooms);
          } catch (error) {
            console.error('Error fetching liked rooms: ', error);
          }
        };
        fetchLikedRooms();
      }
    });



    

    
  },
    [likedRooms]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Saves",
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
 




  return (
    <>
      <ScrollView>


       
        {rooms.map((room) => (
          <View key={room.id} style={styles.roomContainer}>
            {/* Diğer içerikler */}
            <TouchableOpacity
              onPress={() => toggleLike(room.id)} // toggleLike fonksiyonunu çağırırken odanın kimliğini iletiyoruz
              style={styles.likeButton}
            >
              <Ionicons
                name={likedRooms.includes(room.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={likedRooms.includes(room.id) ? 'red' : 'black'}
              />
            </TouchableOpacity>
            
            <Image source={{ uri: room.data.downloadUrlFirebase }} style={styles.roomImage} resizeMode="stretch" />
            <View style={styles.roomDetails}>
              <Text style={styles.roomType}>{room.data.roomType}</Text>
              <Text style={styles.price}>{room.data.pricePerNight} $ / Night</Text>
              {/* Diğer detaylar */}
              <View style={styles.amenitiesContainer}>
                {room.data.roomFeatures.map((feature, index) => (
                  <Text key={index} style={styles.amenity}>
                    {'\u2022'} {feature}
                  </Text>
                ))}
              </View>
              <TouchableOpacity onPress={() => openDetails(rooms.id)} style={styles.detailsButton}>
                <Text style={styles.detailsText}>Detayları İncele</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>


    </>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  roomContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFC72C',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 20,
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
  roomImage: {
    width: deviceWidth / 2.5,
    height: '100%',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  roomDetails: {
    flex: 1,
    padding: 10,
  },
  roomType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
  },
  capacity: {
    fontSize: 14,
    color: '#555',
  },
  amenitiesContainer: {
    flexDirection: 'column',


  },
  amenity: {
    backgroundColor: '#f0f0f0',

    paddingHorizontal: 8,
    marginRight: 8,
    marginTop: 2,
    borderRadius: 4,
  },
});