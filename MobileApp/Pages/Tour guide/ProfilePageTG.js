import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image , Pressable , ScrollView, Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker'
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
        setProfilePhoto(`${server}/${data.profile_phototg}`);
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
        { text: "Yes", onPress: () => navigation.navigate('Welcome') }
      ],
      { cancelable: false }
    );
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
      const response = await fetch(server + "/uploadTG", {
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
    <ScrollView>
    {profileData &&
      <>
      <View style={styles.container}>
      <Image
            source={profilePhoto ? { uri: profilePhoto } : require('../../Images/home.png')} 
            style={styles.profilePicture}
            />
            <Text style={styles.name}>{profileData.first_nametg} {profileData.last_nametg}</Text>
            <Text style={styles.bio}>{profileData.emailtg}</Text>
            <Text style={styles.bio}>{profileData.tourguide_username}</Text>
            <Text style={styles.bio}>{profileData.emailtg}</Text>
            </View>
            
            <View style={styles.Hcontainer}>
            <ScrollView keyboardDismissMode="on-drag">
            <Text style={styles.vhistory}>Visit history</Text>
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
            <View style={styles.buttonContainer}>
            <Pressable
            style={styles.button}
            onPress={handleUploadPhoto}>
            <Text style={[styles.buttontext, { fontSize: 20, fontWeight: 'bold' }]}> Upload Photo </Text>
            </Pressable>
            </View>
            
            </>
          }
          </ScrollView>
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
    marginTop: 20,
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
    height: 200,
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
    marginBottom: 10,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avgrating:{
    height: '5%',
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