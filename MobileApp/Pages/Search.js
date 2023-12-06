import React from 'react';
import { StyleSheet, ImageBackground, Image, Button, View, Pressable, Text} from 'react-native';

export default function Search ({ navigation }) {
  return (
    <>
      <View style={styles.container}>

            <TextInput
            style={styles.input}
            onChangeText={Search}
            placeholder={'Enter username'}
            />

          <Pressable
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 18,fontWeight: 'bold'}]}> Search </Text>
          </Pressable>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
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
    textAlign: 'center',
  },
  button: {
    height: 50,
    width: 250,
    padding: 10,
    borderRadius: 300,
    margin: 10,
    color:"#E2C07C",
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',

  },
  buttonSpacer: {
    height: 16,
  },
});