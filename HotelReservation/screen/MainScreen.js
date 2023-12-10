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
import React, { useLayoutEffect, useState,useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

import { Feather } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';
const data = [
  {
    id: '1',
    roomType: 'Deluxe Room',
    pricePerNight: '$150',
    capacity: '2 guests',
    image: require('../assets/executive-room.jpg'),
    roomFeatures: ['Free Wi-Fi', 'Breakfast Included', 'Air Conditioning','Free Wi-Fi','Breakfast Included','Air Conditioning'],
  },
  {
    id: '2',
    roomType: 'Suite Room',
    pricePerNight: '$250',
    capacity: '4 guests',
    image: require('../assets/executive-room.jpg'),
    roomFeatures: ['Free Wi-Fi','Breakfast Included','Air Conditioning','Free Wi-Fi','Breakfast Included','Air Conditioning'],
  },
  // Diğer oda öğeleri...
];

const deviceHeight=Dimensions.get('window').width;
const deviceWidth=Dimensions.get('window').width;
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
  
  const openDetails = (roomId) => {
    navigation.navigate('RoomDetail', roomId);
  };

  const toggleLike = (roomId) => {
    if (likedRooms.includes(roomId)) {
      const updatedLikedRooms = likedRooms.filter((item) => item !== roomId);
      setLikedRooms(updatedLikedRooms);
    } else {
      setLikedRooms([...likedRooms, roomId]);
    }
  };
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'rooms'));
        const userList = [];
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, data: doc.data() });
          
        });
        setRooms(userList);
        console.log(rooms);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };
    

    fetchRooms();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Booking.com",
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
  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: { width: "80%", marginHorizontal: "3%" },
          text: { fontSize: 20 },
        }}
        primary
        title="Submit"
      />
    );
  };


 

  return (
    <>
      <ScrollView>
        

        <View>
          <View
            style={{
              margin: 20,
              borderColor: "#FFC72C",
              borderWidth: 1,
              borderRadius: 8,
            }}
          >
            {/* Destination */}
            

            {/* Selected Dates */}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="calendar" size={24} color="black" />
              <DatePicker
                style={{
                  width: 350,
                  height: 30,
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: "transparent",
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                  headerStyle: {
                    backgroundColor: "#3081D0",
                    height:deviceHeight/8,
                    
                  },
                  headerMarkTitle: {display:'none' },
                  headerDateTitle: {marginTop:30, fontSize:20,},
                  contentText: {
                    fontSize: 15,
                    
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                }}
                selectedBgColor="#3081D0"
                
                customButton={(onConfirm) => customButton(onConfirm)}
                onConfirm={(startDate, endDate) =>
                  setSelectedDates(startDate, endDate)
                }
                
                allowFontScaling={false}
                placeholder={"Select Your Dates"}
                mode={"range"}
              />
            </Pressable>

            {/* Rooms and Guests */}
            <Pressable
              
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                height:deviceHeight/2,
                alignItems: 'center', justifyContent: 'center'
              }}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <Picker
        selectedValue={selectedAdults}
        style={{ height: 100, width: '40%',justifyContent:'center' }}
        onValueChange={(itemValue) => setSelectedAdults(itemValue)}
      >
        
        <Picker.Item label="1 Adults" value="1" />
        <Picker.Item label="2 Adults" value="2" />
        <Picker.Item label="3 Adults" value="3" />
        <Picker.Item label="4 Adults" value="4" />
        {/* Diğer yetişkin sayıları */}
      </Picker>

      {/* Çocuklar için Picker */}
      <Picker
        selectedValue={selectedChildren}
        style={{ height: 100, width: '50%',justifyContent:'center' }}
        onValueChange={(itemValue) => setSelectedChildren(itemValue)}
      >
        <Picker.Item label="0 Children" value="0" />
        <Picker.Item label="1 Children" value="1" />
        <Picker.Item label="2 Children" value="2" />
        <Picker.Item label="3 Children" value="3" />
        <Picker.Item label="4 Children" value="4" />
        {/* Diğer çocuk sayıları */}
      </Picker>
            </Pressable>
              
            {/* Search Button */}
            <Pressable
              onPress={() => searchPlaces(route?.params.input)}
              style={{
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: "#3081D0",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>

          
          
          
          
          
        </View>
        {rooms.map((room) => (
  <View key={room.id} style={styles.roomContainer}>
    {/* Diğer içerikler */}
    <Image source={{ uri: room.data.imageURL }} style={styles.roomImage} resizeMode="stretch" />
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
    width: deviceWidth/2.5,
    height:'100%',
    justifyContent:'center',
    marginLeft:5,
    marginRight:5,
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
    marginTop :2,
    borderRadius: 4,
  },
});