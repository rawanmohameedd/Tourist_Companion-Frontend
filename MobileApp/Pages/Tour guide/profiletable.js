import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native';
import server from '../../elserver';

const Table = ({tourguide_username}) => {

  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [avgRate, setAvgRate] = useState(0);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  const fetchRatings = async () => {
    try {
      const response = await fetch(server + `/showAllRates/${tourguide_username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ratings');
      }
      const data = await response.json();
      setRatings(data.allRates || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching ratings:', error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [tourguide_username]);

  useEffect(() => {
    console.log('ratings', ratings);
    // Calculate average rating when ratings change
    if (ratings.length > 0) {
      let totalRate = 0;
      ratings.forEach((rating) => {
        totalRate += rating.rate;
      });
      const newAvgRate = totalRate / ratings.length;
      setAvgRate(newAvgRate);
      console.log(newAvgRate, 'rate');
      
      // Update the average rating in the database
      updateAvgRating(newAvgRate);
    } else {
      setAvgRate(0); 
    }
  }, [ratings]);

  const updateAvgRating = async (newAvgRate) => {
    try {
      const response = await fetch(server + '/updateAvgRate/' + tourguide_username, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avgrating: newAvgRate}),
      });
      const data = await response.json();
      console.log('data', data);
      console.log('Update Avg Rating Response:', newAvgRate);
    } catch (error) {
      console.error('Error updating average rating in the database:', error.message);
    }
  };

  // Function to format the date string to YYYY-MM-DD
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

  const onRefresh = () => {
    setRefreshing(true);

    // Implement your refresh logic here
    fetchRatings();

    // Simulate a delay before setting refreshing to false
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#ffffff']} // Android colors for refresh control
              progressBackgroundColor="#121212" // Android background color
              tintColor="#ffffff" // iOS spinner color
            />
          }
        >
          {isLoading ? (
            <Text style={{ color: 'white', textAlign: 'center', margin: 10 }}>Loading...</Text>
          ) : ratings.length === 0 ? (
            <Text style={{ color: 'white', textAlign: 'center', margin: 10 }}>This tourguide hasn't had any ratings yet.</Text>
          ) : (
            <View style={styles.table}>
              <View style={styles.header}>
                <Text style={styles.tableText}>Tourist</Text>
                <Text style={styles.tableText}>Place</Text>
                <Text style={styles.tableText}>Date</Text>
                <Text style={styles.tableText}>Rating</Text>
              </View>
              
              {ratings.map((rating, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.tableText}>{rating.tour_username}</Text>
                  <Text style={styles.tableText}>{rating.visit}</Text>
                  <Text style={styles.tableText}>{formatDate(rating.date_of_the_visit)}</Text>
                  <Text style={styles.tableText}>{rating.rate}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  scrollView: {
    height: Dimensions.get('window').height * 0.7, // Example: 70% of screen height
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
});

export default Table;
