import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, ScrollView } from 'react-native';
import server from '../../elserver';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilePageTG({ navigation, route }) {
  const [profileData, setProfileData] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [token, setToken] = useState(null);

  // const {user}=route.params
  // console.log(user)
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
        setProfilePhoto(`${server}/${data.profile_photot}`);
        console.log(profilePhoto)

      }

    } catch (error) {
      console.error("Error fetching profile:", error.message);
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

  const handleUploadPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        const photoUrl = result.uri;
        await fetchProfilePhoto(photoUrl, token);
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.error("Error selecting/uploading photo:", error.message);
    }
  };
  

  const fetchProfilePhoto = async (photoUrl, token) => {
    try {
      const response = await fetch(server + "/uploadT", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: photoUrl
        })
      });
  
      if (response.ok) {
        const photoData = await response.json();
        setProfilePhoto(photoUrl);
        console.log("Photo uploaded successfully:", photoData);
      } else {
        console.error("Failed to upload photo. Server returned:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error uploading photo:", error.message);
    }
  };

  return (
    <View style={styles.container}>
    {profileData && profilePhoto &&
      <>
      <View style={styles.container}>
      <Image
      source={profilePhoto ? { uri: profilePhoto } : require('../../Images/home.png')} 
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
      <View style={styles.buttonContainer}>
      <Pressable
      onPress={handleUploadPhoto}
      style={styles.button}>
      <Text style={[styles.buttontext, { fontSize: 20, fontWeight: 'bold' }]}> Upload Photo </Text>
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
    marginTop: 250,
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