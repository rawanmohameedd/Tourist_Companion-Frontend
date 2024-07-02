import React,{useState, useEffect} from 'react'
import { StyleSheet, ImageBackground, Image, Button, View, Pressable, Text, TextInput} from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { NFC } from './Tourist/MuseumsVisitTour';

export default function NfcRead ({ navigation }) {
  /*useEffect(() => {
    NfcManager.start();
    return () => {
      NfcManager.setEventListener(NfcTech.Ndef, null);
      NfcManager.stop();
    };
  }, []);

  const readNfc = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log(tag);
      Alert.alert('NFC Tag', JSON.stringify(tag));
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };*/

  //readNfc();

  return (
    <>
      <View style={styles.container}>
         {NFC===1? (
          <View style={styles.pageContainer}>
            <Text style={styles.page}> Read monuement label </Text>
          </View>
        ): (
          <View style={styles.pageContainer}>
            <Text style={styles.page}> Read Tour guide data </Text>
          </View>
        )}
        <Text style={styles.text}> Scan nfc to read info </Text>
        <Image style={styles.image} source={require('../Images/NFC.png')} />
        {NFC===1? (
          <View style={styles.instructionContainer}>
            <Text style={styles.instructions}> - an NFC card is placed besides each monument </Text>
            <Text style={styles.instructions}> - Scan the card and read the monuement label on your own screen </Text>
          </View>
        ): (
          <View style={styles.instructionContainer}>
            <Text style={styles.instructions}> - Scan the name tag of your tour guide for his Information </Text>
            <Text style={styles.instructions}> - This will take you to the tour guide profile </Text>
          </View>
        )}


      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    flexDirection: 'column',
   // justifyContent: 'center',
    alignItems: 'center',
  },
  pageContainer: {
    backgroundColor: 'black',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  page: {
    fontSize: 25,
    justifyContent: "center",
    color: 'white',
  },
  text:{
    fontSize: 35,
    verticalAlign: 'top',
    //flex: 1,
    marginTop: 20,
    textAlignVertical: 'top',
    color: 'white',
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 50,
    marginBottom: 16,
    resizeMode: 'contain',
    alignSelf: 'center',
    //flex: 1,
  },
  instructionContainer: {
    marginTop: 20,
    verticalAlign: 'bottom',
  },
  instructions: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});