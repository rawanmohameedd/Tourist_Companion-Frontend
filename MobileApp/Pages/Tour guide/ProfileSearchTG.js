import React , {useEffect, useState}from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, RefreshControl } from 'react-native';
import server from '../../elserver';
import Table from './profiletable';
import { role } from '../Tourist/ProfilePageT';

export default function SearchProfileTG({ route, navigation }) {
  const { user } = route.params;
  const [refreshing, setRefreshing] = useState(false);

const onRefresh = () => { 
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
  }, 500);
};

let tourguideAvailable
const displayAvailability = (user) =>{
  if (user.isavailable){
    tourguideAvailable = 'Available'
  }
  else{
    tourguideAvailable = 'Not Available'
  }
  return tourguideAvailable
}
const handleRatebutton = () => {
    const name = user;
    navigation.navigate('Rating', { name });
};


  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing}
        onRefresh={onRefresh}/>}>
        <View style={styles.container}>
          <Image
            source={user.profile_phototg ? { uri: `${server}/${user.profile_phototg}` } : require('../../Images/home.png')}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>{user.first_nametg} {user.last_nametg}</Text>
          <Text style={styles.bio}>{user.emailtg}</Text>
          <Text style={styles.bio}>{user.tourguide_username}</Text>
          <Text style={styles.bio}>{user.spoken_langtg}</Text>
          <Text style={styles.bio}>{displayAvailability(user)}</Text>
          </View>

        <View style={styles.Hcontainer}>
          <Text style={styles.vhistory}>Visit history</Text>
          <Table style={styles.historytable} tourguide_username={user.tourguide_username} />
          </View>
          <Text style={styles.avgrating}>Rating: {user.avgrating}/5 </Text>

        {role === 'tourist' && tourguideAvailable === 'Available' &&(
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button}>
              <Text style={[styles.buttontext, { fontSize: 20, fontWeight: 'bold' }]}> Connect </Text>
            </Pressable>
          </View>
        )}
        {role === 'tourist' && (
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleRatebutton}>
              <Text style={[styles.buttontext, { fontSize: 20, fontWeight: 'bold' }]}> Give a rate </Text>
            </Pressable>
          </View>
        )}
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
    height: 300,
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
  historytable: {
    borderColor: 'black',
    borderWidth: 1,
  },
  avgrating: {
    height: '5%',
    width: '50%',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    borderRadius: 300,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#6e706f',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
