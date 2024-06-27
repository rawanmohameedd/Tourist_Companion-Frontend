import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, Alert, TouchableOpacity, ScrollView, Dimensions, PermissionsAndroid, Platform, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import server from '../../elserver';

export let username;

export default function ProfilePageTG({ navigation }) {
  const [profileData, setProfileData] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [token, setToken] = useState(null);
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingtourguide, setIsLoadingtourguide] = useState(true);
  const [tourguide, setTourguide] = useState([]);
  const [TcontainerVisible, setTContainerVisible] = useState(true);
  const [CcontainerVisible, setCContainerVisible] = useState(false);
  const [uploadOptionsVisible, setUploadOptionsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => { 
    setRefreshing(true);
    await fetchProfileData(token)
    await fetchPerviousVisits()
    await connectedTourguide()
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };
  
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const handleUploadFromGallery = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log("Image selection cancelled");
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const photoUrl = response.assets[0].uri;
        await fetchProfilePhoto(photoUrl);
      }
    });
  };

  const handleUploadFromCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log('Permission to access camera was denied');
      return;
    }

    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log("Image capture cancelled");
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const photoUrl = response.assets[0].uri;
        await fetchProfilePhoto(photoUrl);
      }
    });
  };

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

  const handleUploadOptionPress = (onPress) => {
    if (onPress) {
      onPress();
    }
  };

  useEffect(() => {
    fetchToken();
    fetchPerviousVisits();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
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
      const token = await AsyncStorage.getItem("token");
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
      console.log(data);
      
      if (data && data.profile_photot) {
        setProfilePhoto(`${server}/${data.profile_photot}`);
        console.log(profilePhoto);
      }
      username = data.tour_username;
      role = "tourist";
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

  const fetchProfilePhoto = async (photoUrl) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token", token);
      console.log("Uploaded photo", photoUrl);
  
      const formData = new FormData();
      formData.append('image', {
        uri: photoUrl,
        type: 'image/jpeg', 
        name: 'photo.jpg'   
      });
  
      const response = await fetch(`${server}/uploadT`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
  
      if (response.ok) {
        const photoData = await response.json();
        setProfilePhoto(photoUrl);
        console.log("Photo uploaded successfully:", photoData);
      } else {
        console.error("Failed to upload photo.", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error uploading photo:", error.message);
    }
  };
  

  const fetchPerviousVisits = async () => {
    try {
      setTContainerVisible(!TcontainerVisible);
      const response = await fetch(server + `/touristVisits/${profileData.tour_username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ratings');
      }
      const data = await response.json();
      setVisits(data.visits || []);
      console.log('visits:', visits);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching ratings:', error.message);
      setIsLoading(false);
    }
  }

  const connectedTourguide = async () => {
    try {
      setCContainerVisible(!CcontainerVisible);
      const response = await fetch(server + `/getTourguide/${profileData.tour_username}`);
      if (!response.ok) {
        throw new error ('Failed to fetch connected tour guide');
      }
      const data = await response.json();
      console.log('first', data);
      setTourguide(data.value);
      setIsLoadingtourguide(false);
    } catch (error) {
      console.error('Error fetching ratings:', error.message);
      setIsLoadingtourguide(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        {profileData &&
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
              <TouchableOpacity onPress={connectedTourguide} style={styles.button}>
                <Text style={styles.buttontext}>Connected tour guides</Text>
              </TouchableOpacity>
              {CcontainerVisible && (
                <ScrollView keyboardDismissMode="on-drag"
                  style={styles.scrollView} >
                  {isLoadingtourguide ? (
                    <Text style={{ color: 'white', textAlign: 'center', margin: 10 }}>Loading...</Text>
                  ) : tourguide.length === 0 ? (
                    <Text style={{ color: 'white', textAlign: 'center', margin: 10 }}>You have not been connected to any tour guide yet</Text>
                  ) : (
                    <View >
                      <Text style={{ fontSize: 25, color: 'white' }}> Tourguide: {tourguide.tourguide_username}</Text>
                    </View>
                  )}
                </ScrollView>
              )}
              <View>
                <TouchableOpacity onPress={fetchPerviousVisits} style={styles.button}>
                  <Text style={styles.buttontext}>Previous visits </Text>
                </TouchableOpacity>
              </View>
              {TcontainerVisible && (
                <ScrollView keyboardDismissMode="on-drag"
                  style={styles.scrollView} >
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
    borderRadius: 300,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
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
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonContainer: {},
  scrollView: {
    height: Dimensions.get('window').height * 0.2,
  },
  table: {
    borderWidth: 1,
    borderColor: '#6e706f',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#3d3d3d',
    paddingVertical: 5,
    width: "100%",
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
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 12,
  },
  icons: {
    flex: 1,
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