import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, Text, Image, ScrollView } from 'react-native';
import server from '../../elserver';

export default function FindAGuide({ navigation }) {
  const [username, setUsername] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  const handleSearch = async () => {
    try {
        // fetch Find a guide by username request
        if (activeFilter === 'username') {
        const response = await fetch(server + `/username/${username}`);
        if (response.status === 400) {
            setSearchResult(null); 
            setError('No matching users found'); 
        } else {
            const data = await response.json();
            setSearchResult(data);
            setError('');
        }

        // fetch Find a guide by Spoken Language request
    } else if ( activeFilter === 'language'){
        const response = await fetch ( server + `/spoken_lang/${username}`)
        if (response.status === 400){
            setSearchResult(null); 
            setError('No matching users found'); 
        } else {
            const data = await response.json();
            setSearchResult(data);
            setError('');
        }
    }
    } catch (error) {
        console.error('Error fetching search:', error.message);
        setError('Failed to fetch search results');
    }
  };

  const clearSearchResult = () => {
    setSearchResult(null);
  };

  const handleResultPressTourguide = (user) => {
    navigation.navigate('SearchPageTG', { user: user });
    console.log('Pressed:', user);
  };

  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
    if (filter === 'username') {
      handleSearch();
    } else {
      setError('There is an error in search process')
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          placeholder="Enter username"
          value={username}
        />
        <Pressable style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>
      <View style={styles.filterContainer}>
        <Pressable style={[styles.filterButton,
              activeFilter === 'username' && styles.activeFilter]} 
              onPress={() => handleFilterPress('username')}>
          <Text style={styles.filterButtonText}>By Username</Text>
        </Pressable>
        <Pressable style={[styles.filterButton, 
            activeFilter === 'language' && styles.activeFilter]} 
            onPress={() => handleFilterPress('language')}>
          <Text style={styles.filterButtonText}>By Spoken Language</Text>
        </Pressable>
        <Pressable style={[styles.filterButton, 
            activeFilter === 'rating' && styles.activeFilter]} 
            onPress={() => handleFilterPress('rating')}>
          <Text style={styles.filterButtonText}>By Rating</Text>
        </Pressable>
      </View>
      {searchResult && (searchResult.tourGuides.length > 0) ? (
        <ScrollView>
          <View style={styles.resultContainer}>
            {searchResult.tourGuides.map((tourGuide, index) => (
              <Pressable key={index} onPress={() => handleResultPressTourguide(tourGuide)} style={styles.resultItem}>
                <View style={styles.userInfoContainer}>
                  <Image source={tourGuide.profile_phototg ? { uri: `${server}/${tourGuide.profile_phototg}` } : require('../../Images/home.png')} style={styles.profileImage} />  
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: '15%',
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 50,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#E2C07C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  searchButtonText: {
    color: 'black',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  filterButton: {
    backgroundColor: '#E2C07C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  filterButtonText: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
  },
  activeFilter: {
    backgroundColor: '#333',
  },
  resultContainer: {
    marginTop: 20,
    width: '90%',
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
