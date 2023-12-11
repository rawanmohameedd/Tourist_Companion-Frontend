import React from 'react';
import { View, Text, StyleSheet, Image , Pressable} from 'react-native';

export default function ProfilePageTG  ({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
        source={require('../../Images/ppt.jpg')} // Replace with your own image path
        style={styles.profilePicture}
        />
        <Text style={styles.name}>Daniel Nabil</Text>
        <Text style={styles.bio}>Egyptian</Text>
      </View>

    <View style={styles.buttonContainer}>
      <Pressable
            onPress={()=> navigation.navigate('Welcome')}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Sign out </Text>
            </Pressable>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#121212' ,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -200,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color:'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  buttontext: {
    color: 'black',
  },
  users:{
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  button: {
    height: 50,
    width: 250,
    padding: 10,
    borderRadius: 300,
    marginTop: 10,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer:{
    flex: 0,
    marginBottom: 20,

  },
});
