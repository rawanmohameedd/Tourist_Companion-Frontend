import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import server from '../../elserver';
import { usernameTG } from './SigninTG';

export default function TouristsRequests() {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${server}/showRequests/${usernameTG}`);
      const data = await response.json();
      if (data && data.value && data.value.showRequests && data.value.showRequests.rows) {
        setRequests(data.value.showRequests.rows);
      } else {
        setRequests([]);
      }
    } catch (error) {
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRequests();
    setRefreshing(false);
  };

  const handleAccept = async (tourUsername) => {
    try {
      const response = await fetch(`${server}/acceptRequest/${tourUsername}`, {
        method: 'PUT',
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        const acceptedRequest = requests.find(request => request.tour_username === tourUsername);
        setAcceptedRequests([...acceptedRequests, acceptedRequest]);
        setRequests(requests.filter(request => request.tour_username !== tourUsername));
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error accepting request:', error.message);
    }
  };

  const handleDecline = async (tourUsername) => {
    try {
      const response = await fetch(`${server}/declinedRequest/${tourUsername}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        setRequests(requests.filter(request => request.tour_username !== tourUsername));
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error declining request:', error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {requests.length === 0 ? (
        <View style={styles.noRequestsContainer}>
          <Text style={styles.noRequestsText}>You don't have any tourists requests yet.</Text>
        </View>
      ) : (
        requests.map((request, index) => (
          <View key={index} style={styles.requestContainer}>
            <Text style={styles.text}>Tourist Username: {request.tour_username}</Text>
            {request.place && request.place !== 'N/A' && (
              <Text style={styles.text}>Place: {request.place}</Text>
            )}
            {request.visit_date && request.visit_date !== 'N/A' && (
              <Text style={styles.text}>
                Visit Date: {new Date(request.visit_date).toLocaleDateString()}
              </Text>
            )}
            {request.start_date && request.start_date !== 'N/A' && (
              <Text style={styles.text}>
                Start Date: {new Date(request.start_date).toLocaleDateString()}
              </Text>
            )}
            {request.end_date && request.end_date !== 'N/A' && (
              <Text style={styles.text}>
                End Date: {new Date(request.end_date).toLocaleDateString()}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => handleAccept(request.tour_username)}>
                <Text style={styles.buttonText}>Accept ✓</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDecline(request.tour_username)}>
                <Text style={styles.buttonText}>Decline ✗</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {acceptedRequests.length > 0 && (
        <View style={styles.acceptedRequestsContainer}>
          <Text style={styles.acceptedRequestsTitle}>Accepted Requests</Text>
          {acceptedRequests.map((request, index) => (
            <View key={index} style={styles.requestContainer}>
              <Text style={styles.text}>Tourist Username: {request.tour_username}</Text>
              {request.place && request.place !== 'N/A' && (
                <Text style={styles.text}>Place: {request.place}</Text>
              )}
              {request.visit_date && request.visit_date !== 'N/A' && (
                <Text style={styles.text}>
                  Visit Date: {new Date(request.visit_date).toLocaleDateString()}
                </Text>
              )}
              {request.start_date && request.start_date !== 'N/A' && (
                <Text style={styles.text}>
                  Start Date: {new Date(request.start_date).toLocaleDateString()}
                </Text>
              )}
              {request.end_date && request.end_date !== 'N/A' && (
                <Text style={styles.text}>
                  End Date: {new Date(request.end_date).toLocaleDateString()}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    width: '100%',
    padding: 20,
  },
  requestContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  noRequestsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRequestsText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#E2C07C',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  acceptedRequestsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  acceptedRequestsTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

