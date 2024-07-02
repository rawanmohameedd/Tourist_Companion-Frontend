import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import server from '../../elserver';


export default function SearchProfileT({ route }) {
  const { user } = route.params;
  console.log('Rawan btmot',user)
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={user.profile_photot ? { uri: `${server}/${user.profile_photot}` } : require('../../Images/home.png')}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>{user.first_namet} {user.last_namet}</Text>
          <Text style={styles.bio}>{user.emailt}</Text>
          <Text style={styles.bio}>{user.tour_username}</Text>
          <Text style={styles.bio}>{user.emailt}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  vhistory: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  Hcontainer: {
    flex: 1,
    padding: 5,
    backgroundColor: '#6e706f',
    borderRadius: 10,
    width: 400,
    height: 200,
    marginTop: 70,
  },
  buttontext: {
    color: 'black',
  },
  users: {
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  button: {
    height: 50,
    width: 250,
    padding: 10,
    borderRadius: 300,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avgrating: {
    height: '5%',
    width: '50%',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    borderRadius: 300,
    marginTop: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#6e706f',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  historytable: {
    borderColor: 'black',
    borderWidth: '1',
  },
});
