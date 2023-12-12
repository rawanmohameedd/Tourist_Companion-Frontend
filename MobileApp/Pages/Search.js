import React from 'react';
import { StyleSheet, ImageBackground, Image, Button, View, Pressable, Text, TextInput} from 'react-native';

export default function Search ({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
            <TextInput
            style={styles.input}
            onChangeText={Search}
            placeholder={'Enter username'}
            />
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 18,fontWeight: 'bold'}]}> Search </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 200,
    width: 300,
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    //flexDirection: 'column-reverse',
  },
  buttontext: {
    color: 'black',  
    textAlign: 'center',
  },
  button: {
    
    height: 50,
    width: 150,
    padding: 10,
    borderRadius: 300,
    margin: 10,
    color:"#E2C07C",
    backgroundColor: '#E2C07C',
    justifyContent: 'center',
    textAlign: 'center',
    
  },

  searchContainer:{
    backgroundColor: 'white',
    width: '90%',
    height: '6%',
    verticalAlign: 'top',
    marginTop: '15%',
    borderRadius: 50,
    textAlignVertical: 'center',
  },
  input:{
    textAlignVertical:'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,

  },
});