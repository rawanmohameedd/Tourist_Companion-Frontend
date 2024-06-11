import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import WifiReborn from 'react-native-wifi-reborn';
import server from '../elserver';

export default function MuseumList({ navigation }) {
  const [data, setData] = useState([]);
  const [bssidMap, setBssidMap] = useState({});
  const [selectedMuseum, setSelectedMuseum] = useState(null);

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
      // Permission granted
    } else {
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

  // Get museum Bssids
  const museumsBssids = async (museum_name) => {
    try {
      const response = await fetch(`${server}/getBssid/${museum_name}`);
      const data = await response.json();
      console.log('Bssid data:', data);
      setBssidMap(data);
      
      // Navigation logic after fetching BSSID data
      if (Object.keys(data).length === 0) {
        Alert.alert("This museum doesn't support museum features yet");
        navigation.replace("Home Tourguide");
      } else {
        Alert.alert("You can track your guide and check crowded rooms now.");
        navigation.replace("Museum Visit TG");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = async (item) => {
    setSelectedMuseum(item);
    await museumsBssids(item.title);
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
