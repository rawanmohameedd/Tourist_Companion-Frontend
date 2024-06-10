import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker'
import server from '../../elserver';
import Table from './profiletable';

export default function ProfilePageTG({ navigation }) {

  const [profileData, setProfileData] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [token, setToken] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [uploadOptionsVisible, setUploadOptionsVisible] = useState(false);

  
  const toggleUploadOptions = () => {
    setUploadOptionsVisible(!uploadOptionsVisible);
  };

  // Function to handle pressing an item in the upload options list
  const handleUploadOptionPress = (onPress) => {
    if (onPress) {
      onPress();
    }
  };
  const handledelete = async () => {
    // Implement your logic to upload photo from camera
     };

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

  const handleUploadFromGallery = async () => {
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
    }  };


   // Function to handle uploading photo from camera
   const handleUploadFromCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        const photoUrl = result.uri;
        await fetchProfilePhoto(photoUrl, token);
      } else {
        console.log("Image capture cancelled");
      }
    } catch (error) {
      console.error("Error capturing/uploading photo:", error.message);
    }
  };
  

  const [uploadOptions, setUploadOptions] = useState([
    { id: 1, label: 'Upload from Gallery', onPress: handleUploadFromGallery },
    { id: 2, label: 'Take a photo', onPress: handleUploadFromCamera },
    { id: 3, label: 'Delete', onPress: handledelete },
  ]);
  
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

  const handleAvailability = async () => {
    try {
      const response = await fetch(server + "/updateAvailability/" + profileData.tourguide_username, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        setIsAvailable(!isAvailable);
      } else {
        console.error("Failed to update availability. Server returned:", response.status);
      }
    } catch (error) {
      console.error("Error updating availability:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        { profileData &&
          <>
            <View style={styles.container}>
            <Image
              source={profilePhoto ? { uri: profilePhoto } : require('../../Images/home.png')} 
              style={styles.profilePicture}
              />
              
              <View>
                <Pressable
                  onPress={toggleUploadOptions}
                  style={styles.uploadphoto}>
                  <Image
                        style={styles.icons}
                        source={require('../../Images/upload.png')}
                  />
                </Pressable>
              </View>

              {uploadOptionsVisible && (
                <FlatList
                  data={uploadOptions}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.uploadOption}
                      onPress={() => handleUploadOptionPress(item.onPress)}
                    >
                      <Text style={styles.uploadOptionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              )}
              <Text style={styles.name}>{profileData.first_nametg} {profileData.last_nametg}</Text>
              <Text style={styles.bio}>{profileData.emailtg}</Text>
              <Text style={styles.bio}>{profileData.tourguide_username}</Text>
              
            </View>
            <Text style={styles.avgrating}>Rating: {profileData.avgrating}/5 </Text>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, { backgroundColor: isAvailable ? '#E2C07C' : '#3d3d3d' }]}
                onPress={handleAvailability}>
                <Text style={[styles.buttontext, { fontSize: 20, fontWeight: 'bold' }]}>
                  {isAvailable ? 'Available' : 'Not Available'}
                </Text>
              </Pressable>
            </View>
            <View style={styles.Hcontainer}>
              <ScrollView keyboardDismissMode="on-drag">
                <Text style={styles.vhistory}>Visit history</Text>
                <Table style={styles.historytable} tourguide_username={profileData.tourguide_username} />
              </ScrollView>
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
      </ScrollView>
    </View>
  );
};

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
    marginBottom: 5,
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
    // marginTop: 70,
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
   // marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  historytable: {
    borderColor: 'black',
    borderWidth: '1',
  },
  avgrating: {
    height: '5%',
    width: '50%',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 300,
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
   // backgroundColor: '#6e706f',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  draggableContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    zIndex: 1000,
  },
  draggableText: {
    color: 'white',
    fontWeight: 'bold',
  },
  uploadOption: {
    height: 35,
    marginLeft: 100,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2C07C',
    marginVertical: 5,
    borderRadius: 10,
  },
  uploadOptionText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  icons: {
    flex: 1,
    //marginTop: 9,
    //marginLeft: 2,
    height: 70,
    resizeMode: 'center',
  },
  uploadphoto: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginTop: -80,
    marginLeft: 100,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf:'center',
    alignItems: 'center',
   },
});
