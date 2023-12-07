import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";
import { View, Text } from 'react-native';

const ExampleComponent = () => {
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,user => {
      if (user) {
       {/* console.log('Kullanıcı UID:', user.uid); */}
      } else {
        console.log('Kullanıcı oturumu açmış değil.');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>Kullanıcı UID'sini konsolda görmek için bu bileşeni kullanabilirsiniz.</Text>
    </View>
  );
};

export default ExampleComponent;
