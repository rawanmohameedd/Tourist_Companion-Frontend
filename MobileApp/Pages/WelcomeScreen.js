import React from 'react';
import { StyleSheet, ImageBackground, Image, Button, View, Pressable, Text} from 'react-native';

export default function WelcomeApp({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../Images/Logo.png')} />
          <Pressable
          onPress={()=> navigation.navigate('Sign in')}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Sign in </Text>
            </Pressable>
            
          <Pressable
          onPress={()=> navigation.navigate('Sign up as Tour')}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Create tourist account </Text>
            </Pressable>
          
          <Pressable
          onPress={() => navigation.navigate('Sign up as Tour guide')}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 18,fontWeight: 'bold'}]}> Create tour guide account </Text>
            </Pressable>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 0,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  buttonContainer: {
    height: 200,
    width: 300,
    marginBottom: 16,
  },
  buttontext: {
    color: 'black',
    
  },
  button: {
    height: 50,
    width: 250,
    padding: 10,
    borderRadius: 300,
    margin: 5,
    color:"#E2C07C",
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',

  },
  buttonSpacer: {
    height: 16,
  },
});