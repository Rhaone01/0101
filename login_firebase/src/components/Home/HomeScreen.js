import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#FFFFE0'
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 25,
      color: '#800080'
      
    },
    p: {
      fontSize: 20,
      fontWeight: 'semibold',
      marginBottom: 30,
      color: '#800080'

    },
    buttonContainer: {
      width: '26%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 80,
    },
    
  });

  return (
    <View style={styles.container}>
      <AntDesign name="iconfontdesktop" size={50} color="purple" />
        <Text style={styles.title}>Bem vindo(a) a tela inicial!</Text>
        <Text style={styles.p}>Acesse por aqui: </Text>
        <View style={styles.buttonContainer}>
          <Button title="Cadastre-se" onPress={() => navigation.navigate('SignUp')} color={'purple'} />
          <Button title="Login" onPress={() => navigation.navigate('SignIn')} color={'purple'} />
        </View>
    </View>
  );
};

export { HomeScreen };
