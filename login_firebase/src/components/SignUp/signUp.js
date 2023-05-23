import { useState } from "react";
import { TextInput, View, Button, StyleSheet } from "react-native";

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#ffffe0'
    },
    input: {
      borderWidth: 2,
      borderColor: '#800080',
      borderRadius: 5,
      padding: 7,
      marginVertical: 10,
      width: '80%',
      fontWeight: 'bold'
    },

  });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const auth = getAuth();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      
      navigation.navigate('Home')
    }) 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Cadastre-se" onPress={handleSignUp} color={'purple'} />
    </View>
  );
};

export { SignUpScreen };
