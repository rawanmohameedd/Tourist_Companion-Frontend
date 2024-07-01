import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, Text, Image, ScrollView } from 'react-native';
import server from '../../elserver';
import HomeTabTG from './HomeScreenTourguide';
import { launchImageLibrary } from 'react-native-image-picker';



export default function UploadLicense({ navigation }) {
  const handleUpload = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log("Image selection cancelled");
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const photoUrl = response.assets[0].uri;
        await fetchProfilePhoto(photoUrl);
      }
    });
  };


  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={[styles.header , {fontWeight:'bold'}]}>Welcome to Tourist Companion!</Text>
        <Text style={styles.header}>You need to upload your license photo</Text>
        <Text style={styles.header}>to start working as a tour guide</Text>
      </View>

      <View style={styles.ButtonesContainer}>
        <Pressable style={styles.button} onPress={handleUpload}>
          <Text style={[styles.buttontext, { fontSize: 18, fontWeight: 'bold' }]}>Upload</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={()=>navigation.navigate('Home Tourguide')}>
          <Text style={[styles.buttontext, { fontSize: 18, fontWeight: 'bold' }]}>Upload Later</Text>
        </Pressable>
      </View>

      <View style={styles.warnContainer}>
        <Text style={styles.warn}>Warning!</Text>
        <Text style={styles.warn}>If you choose to upload later, you can use some features of the app, but you won't be able to recieve requests from tourists</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonesContainer:{
    verticalAlign: 'middle',
    flex: 1,
  },
  button: {
    height: 50,
    width: 150,
    padding: 10,
    borderRadius: 300,
    margin: 10,
    backgroundColor: '#E2C07C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    color: 'black',
  },
  headerContainer:{
    verticalAlign: 'top',
    flex: 1,
    marginTop: 100,
  },
  header: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'flex-start',
  },
  warnContainer:{
    verticalAlign: 'bottom',
    flex: 1,
  },
  warn:{
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
  },
});
