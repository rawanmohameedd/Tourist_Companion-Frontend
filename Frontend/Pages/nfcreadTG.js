import React,{useState, useEffect} from 'react'
import { StyleSheet, ImageBackground, Image, Button, View, Pressable, Text, TextInput} from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';


export default function NfcReadTG ({ navigation }) {
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

        <Text style={styles.text}> Scan nfc to read info </Text>
        <Image style={styles.image} source={require('../Images/NFC.png')} />
        <View style={styles.instructionContainer}>
          <Text style={styles.instructions}> - Scan the name tag of your tour guide for his Information </Text>
          <Text style={styles.instructions}> - This will take you to the tour guide profile </Text>
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
   // justifyContent: 'center',
    alignItems: 'center',
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