import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import server from '../../elserver';
import Table from './profiletable';

export default function SearchProfileTG({ route }) {
  const { tourGuide } = route.params.tourGuide;
  console.log('Rawan btmot',tourGuide)
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={tourGuide.profile_phototg ? { uri: `${server}/${tourGuide.profile_phototg}` } : require('../../Images/home.png')}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>{tourGuide.first_nametg} {tourGuide.last_nametg}</Text>
          <Text style={styles.bio}>{tourGuide.emailtg}</Text>
          <Text style={styles.bio}>{tourGuide.tourguide_username}</Text>
          <Text style={styles.bio}>{tourGuide.emailtg}</Text>
        </View>

        <View style={styles.Hcontainer}>
          <Text style={styles.vhistory}>Visit history</Text>
          <ScrollView keyboardDismissMode="on-drag">
            <Table style={styles.historytable} />
          </ScrollView>
        </View>

        <Text style={styles.avgrating}>Rating: 4.78/5 </Text>
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
