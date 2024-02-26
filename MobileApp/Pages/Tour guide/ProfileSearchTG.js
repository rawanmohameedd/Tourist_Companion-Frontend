import React , {useEffect, useState}from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, RefreshControl, TouchableOpacity, Dimensions, ScrollViewBase} from 'react-native';
import server from '../../elserver';
import Table from './profiletable';
import { role } from '../Tourist/ProfilePageT';

export default function SearchProfileTG({ route, navigation }) {
  const { user } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [TcontainerVisible, setTContainerVisible] = useState(false);


const onRefresh = () => { 
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
  }, 500);
};

const vhistoryhandlePress = () => {
  setTContainerVisible(!TcontainerVisible);
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

          <Text style={styles.avgrating}>Rating: {user.avgrating}/5 </Text>

        
          <TouchableOpacity onPress={vhistoryhandlePress} style={styles.button}>
              <Text style={styles.buttontext}>Visit history</Text>
            </TouchableOpacity>
            <View/>
            {TcontainerVisible && (
              <View style={styles.Hcontainer}>
                <ScrollView style={styles.historytable}>
                 <Table tourguide_username={user.tourguide_username} /> 
                </ScrollView> 
              </View>
            )}
        <View style={styles.bottomButtonsContainer}>
        {role === 'tourist' && (
          <View style={styles.buttonContainer}>
            <Pressable style={styles.givaARate} onPress={handleRatebutton}>
              <Text style={[styles.buttontext]}> Give a rate </Text>
            </Pressable>
          </View>
        )}

        {role === 'tourist' && tourguideAvailable === 'Available' &&(
          <View style={styles.buttonContainer}>
            <Pressable style={styles.connect}>
              <Text style={[styles.buttontext]}> Connect </Text>
            </Pressable>
          </View>
        )}
        </View>
      </ScrollView>
    </View>
  );
}
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
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
    marginBottom: 5,
  },
  avgrating: {
    height: '10%',
    color: 'white',
    width: '80%',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    borderRadius: 300,
    //marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    //backgroundColor: '#6e706f',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  Hcontainer: {
    //borderColor: 'black',
    borderWidth: 5,
    //height: 'auto',
    alignSelf: 'center',
    //flexDirection: 'column',
    width: '80%',
    //maxHeight: 150,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttontext: {
    color: 'black',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 25,
  },
  button: {
    height: 50,
    //flexDirection: 'row',
    width: '80%',
    //padding: 10,
    //verticalAlign:'middle',
    borderRadius: 300,
    //marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    //textAlignVertical: 'center',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  givaARate:{
    flexDirection: 'row',
    height: 50,
    width: '100%',
    borderRadius: 300,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor: '#E2C07C',
    alignSelf: 'center',
  },
  connect:{
    flexDirection: 'row',
    height: 50,
    width: '100%',
    borderRadius: 300,
    marginBottom: 10,
    marginLeft: 5,
    backgroundColor: '#E2C07C',
    alignSelf: 'center',
  },
});
