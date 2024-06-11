import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import WifiReborn from 'react-native-wifi-reborn';
import server from '../elserver';

export default function MuseumList({ navigation }) {
  const [data, setData] = useState([]);
  const [bssidMap, setBssidMap] = useState([]);
  const [interval , setIntervalID]= useState(null)

  //Permission to access user fine location
  useEffect(()=>{
    Permission();
  })
  const Permission = async () => {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'This app needs location permission.',
        message: 'Location permission is required to use Track your guide and crowded rooms features',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission granted
      } else {
        console.log('Permission not granted');
      }
  };

  // get museums list
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

  // Get  museum Bssids
  const museumsBssids = async (museum_name) => {
    try {
      const response = await fetch(`${server}/getBssid/${museum_name}`);
      const data = await response.json();
      console.log('Bssid data:', data);
      setBssidMap(data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendReadings = async (map) => {
    try {
    const data = await WifiReborn.reScanAndLoadWifiList();
    const filteredDataWithStrength = {};
  
    //Make these bssids with default values (-100)
    Object.keys(map).forEach((bssid) => {
      filteredDataWithStrength[bssid] = -100; // Default value for missing BSSIDs
    });
  
    // Update them with actual WiFi strength values
    data.forEach((wifi) => {
      const bssid = wifi.BSSID;
      if (filteredDataWithStrength[bssid] !== undefined) {
        filteredDataWithStrength[bssid] = wifi.level;
      }
    });
  
      const response = await fetch(`${server}/ConnectWithFlask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filteredDataWithStrength }),
      });
      if (!response.ok) {
        throw new Error('Failed to send WiFi data to server');
      }
      console.log('WiFi data sent successfully.');
    } catch (error) {
      console.error('Error sending WiFi data:', error);
      throw error;
    }
  };
  const handlePress = (item) => {
    museumsBssids(item.title);
    if(bssidMap){
      sendReadings(bssidMap)
    }
    navigation.replace("Museum Visit TG");
    Alert.alert(`You pressed: ${item.title}`);
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => handlePress(item)}>
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
  },
  title: {
    fontSize: 32,
  },
});
