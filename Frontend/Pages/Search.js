import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, Text, Image, ScrollView } from 'react-native';
import server from '../elserver';
import { role } from './Tourist/ProfilePageT';
export default function Search({ navigation }) {
  
  const [username, setUsername] = useState('');
  const [nationality, setNationality] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(server + `/byUsername/${username}`);
      if (response.status === 400) {
        // Handle the case when there are no matching users
        setSearchResult(null); 
        setError('No matching users found'); 
        
      } else if (!response.ok) {
        throw new Error('Failed to fetch search results');

      } else {
        const data = await response.json();
        setSearchResult(data);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching search:', error.message);
      setError('Failed to fetch search results');
    }
  };
  
const handleNationalitySearch = async () => {
  try {
    const response = await fetch(server + `/byNationality/${nationality}`);
    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);

    console.log('hh',nationality)
    if (response.status === 400) {
      // Handle the case when there are no matching users
      setSearchResult(null); 
      setError('No matching users found'); 
    } else if (!response.ok) {
      throw new Error('Failed to fetch nationality search results');
    } else {
      const data = await response.json();
      setSearchResult(data);
      setError('');
    }
  } catch (error) {
    console.error('Error fetching search:', error.message);
    setError('Failed to fetch search results');
  }
};

  const clearSearchResult = () => {
    setSearchResult(null);
  };

  const handleResultPressTourist = (user) => {
    console.log('Pressed:', user);
    navigation.navigate('SearchPageT', { user: user });
  };

  const handleResultPressTourguide = (user) => {
    navigation.navigate('SearchPageTG', { user: user });
    console.log('Pressed:', user);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername }
          placeholder="Enter username"
          placeholderTextColor='#888'
          value={username}
        />
      </View>

      <Pressable style={styles.button} onPress={handleSearch}>
        <Text style={[styles.buttontext, { fontSize: 18, fontWeight: 'bold' }]}>Search</Text>
      </Pressable>
      {searchResult && (searchResult.tourists.length > 0 || searchResult.tourGuides.length > 0) ? (
        <ScrollView>
          <View style={styles.resultContainer}>
            {searchResult.tourists.map((tourist, index) => (
              <Pressable key={index} onPress={() => handleResultPressTourist(tourist)} style={styles.resultItem}> 
                <View style={styles.userInfoContainer}>
                  <Image 
                    source={tourist.profile_photot ? { uri: `${server}/${tourist.profile_photot}` } : require('../Images/home.png')} 
                    style={styles.profileImage} 
                  />
                  <Text style={styles.resultText}>
                    {tourist.tour_username}, Tourist
                  </Text>
                </View>
              </Pressable>
            ))}
            {searchResult.tourGuides.map((tourGuide, index) => (
              <Pressable key={index} onPress={() => handleResultPressTourguide(tourGuide)} style={styles.resultItem}>
                <View style={styles.userInfoContainer}>
                  <Image source={tourGuide.profile_phototg ? { uri: `${server}/${tourGuide.profile_phototg}` } : require('../Images/home.png')} style={styles.profileImage} />  
                  <Text style={styles.resultText}>
                    {tourGuide.tourguide_username}, Tour guide
                  </Text>
                </View>
              </Pressable>
            ))}
            <Pressable onPress={clearSearchResult}>
              <Text style={styles.clearButton}>Clear Search</Text>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.noUserText}>No user found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 150,
    padding: 10,
    borderRadius: 300,
    margin: 10,
    backgroundColor: '#E2C07C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    color: 'black',
  },
  searchContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: 40,
    marginTop: '15%',
    borderRadius: 50,
    textAlignVertical: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: 'black',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    marginRight: 150,
    flexDirection: 'column',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
  },
  resultItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#555',
    width: '100%',
  },
  resultText: {
    color: 'white',
  },
  noUserText: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
  clearButton: {
    color: '#E2C07C',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
