import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Pressable, Text, View, StyleSheet, Alert, PermissionsAndroid, Button } from 'react-native';
import WifiReborn from 'react-native-wifi-reborn';
import server from '../elserver';
import { role } from './Tourist/HomeScreenTour';
import { usernameT } from './Tourist/SigninT';
import { usernameTG } from './Tour guide/SigninTG';

export let fenak , museumName
export default function MuseumList({ navigation }) {
  const [data, setData] = useState([]);
  const [bssidMap, setBssidMap] = useState({});
  const [selectedMuseum, setSelectedMuseum] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  // Permission to access user fine location
  useEffect(() => {
    Permission();
  }, []);

  const Permission = async () => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'This app needs location permission.',
      message: 'Location permission is required to use Track your guide and crowded rooms features',
      buttonNegative: 'DENY',
      buttonPositive: 'ALLOW',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission granted');
      // Permission granted
    } else {
      if (role === "tourist") {
        navigation.replace("Home Tourist");
      } else {
        navigation.replace("Home Tourguide");
      }
      console.log('Permission not granted');
    }
  };

  // add user location
  const addUser = async (username, role, museumName, location) => {
    const payload = {
      username: username,
      role: role,
      museum_name: museumName,
      location: location
    };
    
    try {
      const response = await fetch(`${server}/newUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      fenak = 1
      return result;
    } catch (error) {
      console.error('Error adding new user:', error);
    }
  };
  
  //update user location
  const updateUser = async (username,museum_name, location) => {
    const payload = {
      username: username,
      museum_name: museum_name,
      location: location
    };
    
    try {
      
      const response = await fetch(`${server}/updateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      fenak = 1
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  //delete user location
  const deleteUser = async (username) => {
    try {
      const response = await fetch(`${server}/deleteUser/${username}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      fenak = 0
      return result;
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  //clear interval
  const stopInterval = async(username)=>{
    clearInterval(intervalId)
    await deleteUser(username)
    Alert.alert("It seems that you are out of the museum")
    navigation.replace('Museum List')
    fenak =0 
  }

  // Get museums list
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(`${server}/museums`);
        if (!response.ok) {
          throw new Error('Failed to fetch list');
        }
        const data = await response.json();
        const museumNames = data.map(museum => ({
          id: museum.musid.toString(),
          title: museum.museum_name
        }));
        setData(museumNames);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchList();
  }, []);

  // Get museum BSSIDs
  const museumsBssids = async (museum_name) => {
    try {
      const response = await fetch(`${server}/getBssid/${museum_name}`);
      const data = await response.json();
      setBssidMap(data);

      if (Object.keys(data).length === 0) {
        Alert.alert("This museum doesn't support museum features yet");
        if (role === "tourist") {
          navigation.replace("Home Tourist");
        } else {
          navigation.replace("Home Tourguide");
        }
      } else {
        let username, museumRole;
        if (role === "tourist") {
          Alert.alert("You can track your guide and check crowded rooms now.");
          navigation.replace("Museum Visit");
          username = usernameT;
          museumRole = 'Tourist';
        } else {
          Alert.alert("You can alert your tourists and check crowded rooms now.");
          navigation.replace("Museum Visit TG");
          username = usernameTG;
          museumRole = 'Tour guide';
        }

        // Start scanning for WiFi networks
        let locationInmuseum = await startWiFiScan(data, username, museumRole);
      if (!locationInmuseum) {
        stopInterval(username);
        return;
      }

      await addUser(username, museumRole, museum_name, locationInmuseum);
      console.log(museum_name);

      let counter = 0;

      const id = setInterval(async () => {
        const updatedLocation = await startWiFiScan(data, username, museumRole);
        if (!updatedLocation) {
          // Clear interval if user is out of the museum
          stopInterval(username);
          return;
        } else {
          await updateUser(username, museum_name, updatedLocation);
          counter++;
          console.log(counter);
          setIntervalId(id);
        }
      }, 60100);
    }
  } catch (error) {
    console.error(error);
  }
};

  const startWiFiScan = async (bssidMap, username, role) => {
    try {
      console.log('BSSID Map:', bssidMap);
      const wifiList = await WifiReborn.reScanAndLoadWifiList();
      console.log('WiFi List:', wifiList); // Added debug log to check WiFi list
  
      const readings = bssidMap.reduce((acc, { bssid }) => {
        const wifi = wifiList.find(wifi => wifi.BSSID === bssid);
        acc[bssid] = wifi ? wifi.level : -100;
        return acc;
      }, {});
  
      console.log('Filtered readings:', readings);

      const checkReadings = Object.values(readings).every(value => value === -100);
      if (checkReadings) {
        stopInterval(username)
        return null;
      } else {
        // Send readings to Flask server
        const location = await sendReadingsToFlask(readings, username);
        console.log(username, 'is a', role, 'and currently on', location);
        return location;
      }
    } catch (error) {
      console.error('Error scanning WiFi networks:', error);
    }
  };

  

  const sendReadingsToFlask = async (readings) => {
    try {
      const response = await fetch(`${server}/ConnectWithFlask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ readings }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending data to Flask server:', error);
    }
  };

  const handlePress = async (item) => {
    setSelectedMuseum(item);
    museumName = item.title
    console.log('hena fel handle press',museumName)
    await museumsBssids(item.title);
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => handlePress(item)}
    >
      
      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.headerText}>Please choose the museum you are in</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
    marginVertical: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#E2C07C',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignContent:'center',
    justifyContent: 'center',
    alignItems:'center',
  },
  title: {
    fontSize: 32,
    color: 'black',
    justifyContent:'center',
    alignSelf:'center',
    textAlign: 'center',
  },
});