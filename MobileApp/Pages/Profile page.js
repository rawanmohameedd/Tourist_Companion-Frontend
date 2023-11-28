import React from 'react';
import { View, Text, StyleSheet, Image , Pressable} from 'react-native';

export default function ProfilePage  () {
  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/download.jpg')} // Replace with your own image path
        style={styles.profilePicture}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.bio}>Nationality</Text>
      <Pressable
          
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Sign out </Text>
            </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 18,
    color: 'gray',
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

  }
});
