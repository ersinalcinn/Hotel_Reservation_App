import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAYPxaYGcIZVkTOzg1StOcIQgJ7v9PjDMs",
  authDomain: "hotelreservationapp-366ed.firebaseapp.com",
  projectId: "hotelreservationapp-366ed",
  storageBucket: "hotelreservationapp-366ed.appspot.com",
  messagingSenderId: "548640068076",
  appId: "1:548640068076:web:573f570473ab89ae8b30c9"
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
