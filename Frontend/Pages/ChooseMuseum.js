import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Pressable, Text, View, StyleSheet, Alert, PermissionsAndroid, Button } from 'react-native';
import WifiReborn from 'react-native-wifi-reborn';
import server from '../elserver';
import { role } from './Tourist/ProfilePageT';

export default function MuseumList({ navigation }) {
  const [data, setData] = useState([]);
  const [bssidMap, setBssidMap] = useState({});
  const [selectedMuseum, setSelectedMuseum] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const isScanningRef = useRef(isScanning);

  // Update ref whenever isScanning changes
  useEffect(() => {
    isScanningRef.current = isScanning;
  }, [isScanning]);

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
      console.log('BSSID data:', data);
      setBssidMap(data);

      if (Object.keys(data).length === 0) {
        Alert.alert("This museum doesn't support museum features yet");
        if (role === "tourist") {
          navigation.replace("Home Tourist");
        } else {
          navigation.replace("Home Tourguide");
        }
      } else {
        if (role === "tourist") {
          Alert.alert("You can track your guide and check crowded rooms now.");
          navigation.replace("Museum Visit");
        } else {
          Alert.alert("You can alert your tourists and check crowded rooms now.");
          navigation.replace("Museum Visit TG");
        }

        // Start scanning for WiFi networks
        startWiFiScan(data);

        // Setinterval to repeat the process every 1 minute
        const id = setInterval(() => {
          startWiFiScan(data);
        }, 60000);
        setIntervalId(id);
        setIsScanning(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startWiFiScan = async (bssidMap) => {
    try {
      const wifiList = await WifiReborn.reScanAndLoadWifiList();

      const readings = Object.keys(bssidMap).reduce((acc, bssid) => {
        const wifi = wifiList.find(wifi => wifi.BSSID === bssid);
        acc[bssid] = wifi ? wifi.level : -100;
        return acc;
      }, {});

      console.log('Filtered readings:', readings);

      // Send readings to Flask server
      await sendReadingsToFlask(readings);
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
      const result = await response.json();
      console.log('Flask response:', result);
    } catch (error) {
      console.error('Error sending data to Flask server:', error);
    }
  };

  const handlePress = async (item) => {
    if (!isScanningRef.current) {
      setSelectedMuseum(item);
      await museumsBssids(item.title);
    } else {
      Alert.alert("Please exit the current museum before selecting another.");
    }
  };

  const handleExitMuseum = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsScanning(false);
    }
    setSelectedMuseum(null);
    setIsScanning(false);
    Alert.alert("You have exited the museum.");
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => handlePress(item)}
      disabled={isScanning && selectedMuseum?.id !== item.id}
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
      {isScanning && (
        <Button title="I am out of the museum" onPress={handleExitMuseum} />
      )}
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
