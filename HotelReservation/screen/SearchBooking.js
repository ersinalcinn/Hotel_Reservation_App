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
import firebase from 'firebase/compat/app'; // Firebase app modülü
import 'firebase/compat/firestore';
import { Feather } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import { addDoc,collection, query, where, getDocs, updateDoc, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const deviceHeight = Dimensions.get('window').width;
const deviceWidth = Dimensions.get('window').width;
const SearchBooking = ({ route }) => {
  const auth = getAuth(app);
  const { values } = route.params;
  const [receivedParams, setReceivedParams] = useState(null);
  const { dates, adults, children } = values;


  const firestore = getFirestore(app);
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [selectedDates, setSelectedDates] = useState();

  const [selectedAdults, setSelectedAdults] = useState('');
  const [selectedChildren, setSelectedChildren] = useState('');
  const [likedRooms, setLikedRooms] = useState([]);
  const [userID, setUserID] = useState(['']);
  const [emptyRooms, setEmptyRooms] = useState([]);
  const openDetails = (roomID) => {
    if (dates.startDate && dates.endDate) {

      const partsStart = dates.startDate.split('/'); // Tarihi parçalara ayır

      // Yıl, ay ve gün bilgilerini al
      const yearStart = partsStart[0];
      const monthStart = partsStart[1];
      const dayStart = partsStart[2];

      // Yeni tarih oluştur ve ters sırada birleştir
      const reversedDateStart = `${dayStart}/${monthStart}/${yearStart}`;
      const partsEnd = dates.endDate.split('/'); // Tarihi parçalara ayır

      // Yıl, ay ve gün bilgilerini al
      const yearEnd = partsEnd[0];
      const monthEnd = partsEnd[1];
      const dayEnd = partsEnd[2];

      // Yeni tarih oluştur ve ters sırada birleştir
      const reversedDateEnd = `${dayEnd}/${monthEnd}/${yearEnd}`;
      const date1 = new Date(
        partsStart[0], // Yıl
        partsStart[1] - 1, // Ay (0'dan başlar, bu yüzden bir eksiltme yapılmalı)
        partsStart[2] // Gün
      );
      const date2 = new Date(
        partsEnd[0], // Yıl
        partsEnd[1] - 1, // Ay (0'dan başlar, bu yüzden bir eksiltme yapılmalı)
        partsEnd[2] // Gün
      );

      // İki tarih arasındaki milisaniye farkını al
      const differenceInTime = date2.getTime() - date1.getTime();
      console.log(date1, date2);
      // Milisaniye farkını gün cinsine dönüştür
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      const room = rooms.find(room => room.id === roomID);
      console.log(roomID);
      if (room) {
        price = room.data.pricePerNight;

      }
      const totalPrice = differenceInDays * price;

      console.log(totalPrice);



      Alert.alert(
        'Rezervasyon Bilgileri',
        `Başlangıç Tarihi: ${reversedDateStart}\nBitiş Tarihi: ${reversedDateEnd}\nYetişkin Sayısı: ${adults}\nÇocuk Sayısı: ${children}\nToplam Fiyat: ${totalPrice} $`,
        [
          {
            text: 'Evet',
            onPress: async () => {
              const formattedInputStart = dates.startDate.replace(/\//g, '-');
              const formattedInputEnd = dates.endDate.replace(/\//g, '-');
              const startDate = new Date(formattedInputStart);
              const endDate = new Date(formattedInputEnd);
              const startDateTimestamp = firebase.firestore.Timestamp.fromDate(startDate);
              const endDateTimestamp = firebase.firestore.Timestamp.fromDate(endDate);
              const uniqueId = uuidv4();

              const docRef = await addDoc(collection(firestore, "reservation"), {
                userUID: auth.currentUser.uid,
                startDate: startDateTimestamp,
                endDate: endDateTimestamp,
                roomID:roomID,
              });
              Alert.alert("Reservation succesfull.");
              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Rezervasyon Oluşturuldu',
                  body: "Rezarvasyonunuz alınmıştır.İyi günler",
                },
                trigger: null,
              });
              navigation.navigate("Bookings");
            },
          },
          {
            text: 'Hayır',
            onPress: () => console.log('Rezervasyon iptal edildi'),
            style: 'cancel',
          },
        ]
      );
    } else {
      Alert.alert('Hata', 'Lütfen tarihleri seçin');
    }
  };
  useEffect(() => {
    const user = auth.currentUser;
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

      fetchLikedRooms(); // fetchLikedRooms'ü burada çağırın
    } 


    const fetchRooms = async () => {
      const formattedInputStart = dates.startDate.replace(/\//g, '-');
      const formattedInputEnd = dates.endDate.replace(/\//g, '-');
      const startDate = new Date(formattedInputStart);
      const endDate = new Date(formattedInputEnd);
      const startDateTimestamp = firebase.firestore.Timestamp.fromDate(startDate);
      const endDateTimestamp = firebase.firestore.Timestamp.fromDate(endDate);


      const reservationsQuery = query(
        collection(firestore, 'reservation'),
        // Rezervasyon başlangıç tarihi kullanıcının girdiği başlangıç tarihinden sonra veya aynıysa
        where('startDate', '<=', endDateTimestamp) // Rezervasyon bitiş tarihi kullanıcının girdiği bitiş tarihinden önce
      );

      // Firestore'dan rezervasyonları al
      const querySnapshot = await getDocs(reservationsQuery);

      // Rezervasyon yapılı olan odaların ID'lerini toplama
      const bookedRoomIds = [];
      querySnapshot.forEach((doc) => {
        bookedRoomIds.push(doc.data().roomID);

      });

      // Tüm odaların listesini almak için sorgu
      const allRoomsQuery = await getDocs(query(collection(firestore, 'rooms'),
        where('capacityChildren', '==', children),
        where('capacity', '==', adults)
      ));

      // Boş odaları bul
      const emptyRooms = [];
      allRoomsQuery.forEach((roomDoc) => {
        const roomId = roomDoc.id;
        if (!bookedRoomIds.includes(roomId)) {
          emptyRooms.push({ id: roomDoc.id, data: roomDoc.data() });
        }
      });
      setRooms(emptyRooms);
      //console.log('Boş Odalar:', emptyRooms);
    };

    fetchRooms(); // fetchRooms'u burada çağırın


  }, []); // route.params ve receivedParam bağımlılıkları
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Bookings List",
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
            

            <Image source={{ uri: room.data.downloadUrlFirebase }} style={styles.roomImage} resizeMode="stretch" />
            <View style={styles.roomDetails}>
              <Text style={styles.roomType}>{room.data.roomType}</Text>
              <Text style={styles.price}>{room.data.pricePerNight} $ / Night</Text>
              <View style={styles.capacityContainer}>
                <Text style={styles.capacityText}>
                  <Text style={{ color: 'gray', }}> {room.data.capacity} Adults / </Text>

                  <Text style={{ color: 'gray', }}>{room.data.capacityChildren} Children</Text>
                </Text>
              </View>
              <View style={styles.amenitiesContainer}>
                {room.data.roomFeatures.map((feature, index) => (
                  <Text key={index} style={styles.amenity}>
                    {'\u2022'} {feature}
                  </Text>
                ))}
              </View>
              <TouchableOpacity onPress={() => openDetails(room.id)} style={styles.detailsButton}>
                <Text style={styles.detailsText}>Booking Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>


    </>
  );
};

export default SearchBooking;

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