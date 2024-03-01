import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, Alert, TouchableOpacity, ScrollView } from 'react-native';
import server from '../../elserver';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';

export let role = "tourist"
export let username 
export default function ProfilePageTG({ navigation }) {

  const [profileData, setProfileData] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [token, setToken] = useState(null);
  const [visits , setVisits] = useState([])
  const [isLoading, setIsLoading]= useState(true)
  const [TcontainerVisible, setTContainerVisible] = useState(false);
  const [CcontainerVisible, setCContainerVisible] = useState(false);
  const [uploadOptionsVisible, setUploadOptionsVisible] = useState(false);


  const vhistoryhandlePress = () => {
    setTContainerVisible(!TcontainerVisible);
  };

  const ConnectedTGhandlePress = () => {
    setCContainerVisible(!CcontainerVisible);
  };

  // Function to handle uploading photo from gallery
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

  // Function to handle uploading photo from camera
  const handledelete = async () => {
  // Implement your logic to upload photo from camera
   };

  const [uploadOptions, setUploadOptions] = useState([
    { id: 1, label: 'Upload from Gallery', onPress: handleUploadFromGallery },
    { id: 2, label: 'Take a photo', onPress: handleUploadFromCamera },
    { id: 3, label: 'Delete', onPress: handledelete },
  ]);
  const toggleUploadOptions = () => {
    setUploadOptionsVisible(!uploadOptionsVisible);
  };

  // Function to handle pressing an item in the upload options list
  const handleUploadOptionPress = (onPress) => {
    if (onPress) {
      onPress();
    }
  };

  

  useEffect(() => {
    fetchToken();
    fetchPerviousVisits();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    // Add leading zeros if month or day is less than 10
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    
    return `${year}-${month}-${day}`;
  };

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
      console.log(data)
      
      if (data && data.profile_photot) {
        setProfilePhoto(`${server}/${data.profile_photot}`);
        console.log(profilePhoto)
        
      }
      username = data.tour_username
      role = "tourist"
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
/*
  const handleUploadPhoto = async () => {
    
  };
  */
  

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
  
  const fetchPerviousVisits = async ()=>{
    try {
    const response = await fetch(server + `/touristVisits/${profileData.tour_username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ratings');
      }
      const data = await response.json();
      setVisits(data.visits || []);
      console.log('visits:',visits)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching ratings:', error.message);
      setIsLoading(false)
    }
  }
  

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

    
      <Text style={styles.name}>{profileData.first_namet} {profileData.last_namet}</Text>
      <Text style={styles.bio}>{profileData.nationalityt}</Text>
      <Text style={styles.bio}>{profileData.tour_username}</Text>
      </View>


      <View>
      <TouchableOpacity onPress={ConnectedTGhandlePress} style={styles.button}>
              <Text style={styles.buttontext}>Connected tour guides</Text>
      </TouchableOpacity>

      {CcontainerVisible && (
      <ScrollView keyboardDismissMode="on-drag">
      {isLoading ? (
        <Text style={{ color: 'white', textAlign: 'center', margin: 10 }}>Loading...</Text>
      ) : visits.length === 0 ? (
        <Text style={{ color: 'white', textAlign: 'center', margin: 10 }}>You're currently not connected to any tour guide</Text>
      ) : (
      <View style={styles.table}>
      <View style={styles.header}>
      <Text style={styles.tableText}>Place </Text>
      <Text style={styles.tableText}>tourguide_username</Text>
      <Text style={styles.tableText}>Date</Text>
      <Text style={styles.tableText}>Rating</Text>
      </View>
      {visits.map((visits, index) => (
        <View key={index} style={styles.row}>
        <Text style={styles.tableText}>{visits.visit}</Text>
        <Text style={styles.tableText}>{visits.tourguide_username}</Text>
        <Text style={styles.tableText}>{formatDate(visits.date_of_the_visit)}</Text>
        <Text style={styles.tableText}>{visits.rate}</Text>
        </View>
        ))}
        </View>
        )}
        </ScrollView>
        )}
        </View>

      <View>
      <TouchableOpacity onPress={vhistoryhandlePress} style={styles.button}>
              <Text style={styles.buttontext}>Previous visits </Text>
      </TouchableOpacity>

      {TcontainerVisible && (
      <ScrollView keyboardDismissMode="on-drag">
      {isLoading ? (
        <Text style={{ color: 'white', textAlign: 'center', margin: 10 }}>Loading...</Text>
      ) : visits.length === 0 ? (
        <Text style={{ color: 'white', textAlign: 'center', margin: 10 }}>Start surfing Egypt with us to fill this field</Text>
      ) : (
      <View style={styles.table}>
      <View style={styles.header}>
      <Text style={styles.tableText}>Place </Text>
      <Text style={styles.tableText}>tourguide_username</Text>
      <Text style={styles.tableText}>Date</Text>
      <Text style={styles.tableText}>Rating</Text>
      </View>
      {visits.map((visits, index) => (
        <View key={index} style={styles.row}>
        <Text style={styles.tableText}>{visits.visit}</Text>
        <Text style={styles.tableText}>{visits.tourguide_username}</Text>
        <Text style={styles.tableText}>{formatDate(visits.date_of_the_visit)}</Text>
        <Text style={styles.tableText}>{visits.rate}</Text>
        </View>
        ))}
        </View>
        )}
        </ScrollView>
        )}
        </View>



        <View style={styles.buttonContainer}>
        <Pressable
        onPress={handleSignOut}
        style={styles.button}>
        <Text style={[styles.buttontext]}> Sign out </Text>
        </Pressable>
        </View>

        </>
      }
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
    marginTop: 0,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 50,
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
    fontWeight: 'bold',
    verticalAlign: 'middle',
    fontSize: 20,
    alignSelf: 'center',
  },
  users: {
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  button: {
    height: 50,
    width: 250,
    //padding: 10,
    borderRadius: 300,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf:'center',
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
  buttonContainer: {
    //marginBottom: 20,
    //justifyContent: 'center',
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
    marginTop: 70,
  },
  
  table: {
    borderWidth: 1,
    borderColor: '#6e706f',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#3d3d3d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "90%"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#6e706f',
  },
  tableText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 12
  },
  icons: {
    flex: 1,
    //marginTop: 9,
    //marginLeft: 2,
    height: 70,
    resizeMode: 'center',
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
});