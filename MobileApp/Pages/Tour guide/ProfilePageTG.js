import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image , Pressable , ScrollView, Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import server from '../../elserver';
import Table from './profiletable';

export default function ProfilePageTG  ({navigation}) {

  const [profileData, setProfileData] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      setToken(token);
      fetchProfileData(token);
    } catch (error) {
      console.error("Error fetching token:", error.message);
    }
  };

  const fetchProfileData = async (token) => {
    try {
      if (!token) {
        return;
      }

      const response = await fetch(server + "/ProfileTG", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProfileData(data);

      if (data && data.profile_phototg) {
        fetchProfilePhoto(data.profile_phototg, token);
      }
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    }
  };

  const fetchProfilePhoto = async (photoUrl, token) => {
    try {
      const response = await fetch(server + "/uploadTG", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          image: photoUrl
        })
      });
      const photoData = await response.json();
      setProfilePhoto(photoData);
    } catch (error) {
      console.error("Error fetching profile photo:", error.message);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: () => signOut() }
      ],
      { cancelable: false }
    );
  };

  const signOut = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      {profileData &&
        <>
          <View style={styles.container}>
            <Image
              source={{ uri: profilePhoto }} 
              style={styles.profilePicture}
            />
            <Text style={styles.name}>{profileData.first_nametg} {profileData.last_nametg}</Text>
            <Text style={styles.bio}>{profileData.emailtg}</Text>
            <Text style={styles.bio}>{profileData.tourguide_username}</Text>
            <Text style={styles.bio}>{profileData.emailtg}</Text>
          </View>

          <View style={styles.Hcontainer}>
        <Text style={styles.vhistory}>Visit history</Text>
        <ScrollView keyboardDismissMode="on-drag">
          <Table style={styles.historytable}>

          </Table>
        </ScrollView>
      </View>

    <Text style={styles.avgrating}>Rating: 4.78/5 </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleSignOut}
              style={styles.button}>
              <Text style={[styles.buttontext, { fontSize: 20, fontWeight: 'bold' }]}> Sign out </Text>
            </Pressable>
          </View>
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#121212' ,
    alignItems: 'center',
    justifyContent: 'center',
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
  vhistory:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  Hcontainer:{
    flex: 1,
    padding: 5,
    backgroundColor: '#6e706f',
    borderRadius: 10,
    width: 400,
    height: 450,
    marginTop: 70,
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
  avgrating:{
    height: '7%',
    width: '50%',
    fontWeight:'bold',
    fontSize:20,
    padding: 10,
    borderRadius: 300,
    marginTop: 10,
    textAlign:'center',
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
