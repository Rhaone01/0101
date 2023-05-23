import { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'

const SignInScreen = () => {
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
      borderRadius: 4,
      padding: 5,
      marginVertical: 10,
      width: '80%',
      fontWeight: 'bold'
    },
    link: {
      color: '#800080',
      fontWeight: 'semibold',
      textDecorationLine: 'underline',
      marginVertical: 10,
    }
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigation = useNavigation();
  const auth = getAuth();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;

        
        navigation.navigate('Profile')

        
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
          setEmailError('E-mail inválido');
        } else {
          setEmailError('');
        }

        if (error.code === 'auth/wrong-password') {
          setPasswordError('Senha incorreta');
        } else {
          setPasswordError('');
        }
      });
  }

  const handlePasswordRecovery = () => {
    if (email !== '') {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('E-mail de recuperação de senha enviado!');
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  return (
    <View style={styles.container}>

      {emailError ? <Text>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        onChangeText={(text) => {
          setEmail(text);
          setEmailError('');
        }}
        value={email}
      />

      {passwordError ? <Text>{passwordError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError('');
        }}
        value={password}
        secureTextEntry
      />
      <Text style={styles.link} onPress={handlePasswordRecovery}>Recuperar Senha?</Text>


      <Button title="Entrar" onPress={handleSignIn} color={'purple'}/>
    </View>
  );
};

export { SignInScreen };
