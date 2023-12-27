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
  import { Picker } from '@react-native-picker/picker';
  
  import { Feather } from "@expo/vector-icons";
  import DatePicker from "react-native-date-ranges";
  import { collection, query, where, getDocs,updateDoc,deleteDoc} from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { getFirestore, doc, getDoc } from 'firebase/firestore';
  import app from '../firebase';
  
  
  const deviceHeight = Dimensions.get('window').width;
  const deviceWidth = Dimensions.get('window').width;
  
  const HomeScreen = () => {
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
    
    const updateRoom = (roomId) => {
      navigation.navigate('UpdateRoom', roomId);
    };
    const deleteRoom = (id) => {
    console.log(id);
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
                  await deleteDoc(doc(firestore, "rooms", id));
                  Alert.alert("This record deleted.");
                  navigation.replace('Main');
              
              },
            },
          ],
          { cancelable: false }
        );
    };
    const handleAddRoom = () => {
        navigation.navigate('AddRoom');
      };
    const searchRoom = () => {
      if(selectedDates!=null )
      {
        const values = {
          dates:selectedDates,
          adults:selectedAdults,
          children:selectedChildren
        };
        
        navigation.navigate('SearchBooking',{values});
      }
      else 
      {
        Alert.alert("Please select a timeline for reservation ");
      }
      
    };
    const toggleLike =async  (roomId) => {
      
      const isLiked = likedRooms.includes(roomId);
      
      if (isLiked) {
       const index = likedRooms.indexOf(roomId); // Odanın index'ini al
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
  
  
  
      const fetchRooms = async () => {
        try {
          const querySnapshot = await getDocs(collection(firestore, 'rooms'));
          const userList = [];
          querySnapshot.forEach((doc) => {
            userList.push({ id: doc.id, data: doc.data() });
  
          });
          setRooms(userList);
  
        } catch (error) {
          console.error('Error fetching users: ', error);
        }
      };
  
  
      fetchRooms();
    },
      []);
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        title: "Rooms",
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
            <TouchableOpacity onPress={handleAddRoom} style={{ marginRight: 12 }}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        ),
      });
    }, []);

    return (
      <>
        <ScrollView>
  
  
         
          {rooms.map((room) => (
            <View key={room.id} style={styles.roomContainer}>
              {/* Diğer içerikler */}
              
              
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
                <TouchableOpacity onPress={() => updateRoom(room.id)} style={styles.detailsButton}>
                  <Text style={styles.detailsText}>Update Room</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteRoom(room.id)} style={styles.detailsButton}>
                  <Text style={styles.detailsText}>Delete Room</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          ))}
        </ScrollView>
  
  
      </>
    );
  };
  
  export default HomeScreen;
  
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