import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import server from '../../elserver';
import * as SecureStore from 'expo-secure-store';

export default function ProfilePageTG({ navigation }) {
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

      const response = await fetch(server + "/ProfileT", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProfileData(data);

      if (data && data.profile_photot) {
        fetchProfilePhoto(data.profile_photot, token);
      }
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    }
  };

  const fetchProfilePhoto = async (photoUrl, token) => {
    try {
      const response = await fetch(server + "/uploadT", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          image: photoUrl
        })
      });
      const photoData = await response.json();
      console.log(photoData)
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
              source={{uri: profilePhoto}} 
              style={styles.profilePicture}
            />
            <Text style={styles.name}>{profileData.first_namet} {profileData.last_namet}</Text>
            <Text style={styles.bio}>{profileData.nationalityt}</Text>
            <Text style={styles.bio}>{profileData.tour_username}</Text>
            <Text style={styles.bio}>{profileData.emailt}</Text>
          </View>

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
    color: 'white',
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
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0,
    marginBottom: 20,
  },
});
