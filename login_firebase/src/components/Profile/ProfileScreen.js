import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import { View, Image, Text, StyleSheet, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from "react-native";
import { getStorage, ref, uploadString } from "firebase/storage";

const ProfileScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      backgroundColor: '#FFFFE0'
    },
     title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 10,
    },
    verifiedEmail: {
      color: "green",
      fontSize: 15,
      marginTop: 10,
      marginBottom: 15
    },
    notVerifiedEmail: {
      color: "red",
      fontSize: 15,
      marginTop: 10,
      marginBottom: 15
    },
  });

  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const defaulImage = "foto-de-perfil-bissexual-gay-masculino-roxo-silhueta-perfil-avatar-icone-simbolo-400-147288469.jpg"
  const [image, setImage] = useState(user.photoURL ? user.photoURL : defaulImage);
  const storage = getStorage();
  const storageRef = ref(storage, 'image1');

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleProfilePhoto = async () => {
    console.log("clicou")
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      console.log(result)
      console.log(storageRef)
      console.log(image)
      await uploadString(storageRef, image, 'base_url').then((snapshot) => {
      console.log('Uploaded a data_url string!');
});
        
    }
  }

  const handleVerifyEmail = () => {
    sendEmailVerification(user).then(() => {
      console.log("Email enviado!");
    });
  };

  console.log(user.displayName);
  console.log(user.email);
  console.log(user.emailVerified);
  console.log(user.photoURL);
  console.log(user.uid);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfilePhoto} >
        
          <Image source={{uri:image}}  style={{width:180, height: 180}}/>
        
      </TouchableOpacity>

      <Text style={styles.title}>Perfil</Text>
      <Text >{user.displayName}</Text>
      <Text fontSize={15}>{user.email} </Text>
      {user.emailVerified ? (
        <Text style={styles.verifiedEmail}>Perfil Verificado!</Text>
      ) : (
        <Text style={styles.notVerifiedEmail} onPress={handleVerifyEmail}>
          Perfil não verificado!
        </Text>
      )}
      <Button title="Sair" onPress={handleSignOut} color={'#800080'} />
    </View>
  );
};

export { ProfileScreen };
