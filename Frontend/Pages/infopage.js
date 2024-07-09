import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import server from '../elserver';

export default function Infopage({ route }) {
  const [museum, setMuseum] = useState(null);
  const [TcontainerVisible, setTContainerVisible] = useState(false);
  const [IcontainerVisible, setIContainerVisible] = useState(false);
  const [McontainerVisible, setMContainerVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { musid } = route.params;

  const ThandlePress = () => {
    setTContainerVisible(!TcontainerVisible);
  };

  const IhandlePress = () => {
    setIContainerVisible(!IcontainerVisible);
  };

  const MhandlePress = () => {
    setMContainerVisible(!McontainerVisible);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMuseum();
    setRefreshing(false);
  }, [musid]);

  useEffect(() => {
    fetchMuseum();
  }, [musid]);

  const fetchMuseum = async () => {
    try {
      const response = await fetch(`${server}/museum/${musid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch museum');
      }
      const data = await response.json();
      setMuseum(data.value);
    } catch (error) {
      console.error('Error fetching museum:', error.message);
    }
  };

  return (
    <>
      {museum && (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View style={styles.imagecontainer}>
              <ImageBackground
                style={styles.image}
                resizeMode={'contain'}
                source={{ uri: `${server}/${museum.musuem_image}` }}>
                <Text style={styles.caption}>{museum.museum_name}</Text>
              </ImageBackground>
            </View>

            <TouchableOpacity onPress={ThandlePress} style={styles.touchable}>
              <Text style={styles.heading}>Tickets prices</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            {TcontainerVisible && (
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Tourist Ticket: {museum.ticket_tourist}</Text>
                <Text style={styles.infoText}>Adult Ticket: {museum.ticket_adult}</Text>
                <Text style={styles.infoText}>Student Ticket: {museum.ticket_student}</Text>
              </View>
            )}

            <TouchableOpacity onPress={IhandlePress} style={styles.touchable}>
              <Text style={styles.heading}>Museum Info</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            {IcontainerVisible && (
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>{museum.museinfo}</Text>
              </View>
            )}

            <TouchableOpacity onPress={MhandlePress} style={styles.touchable}>
              <Text style={styles.heading}>Map</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            {McontainerVisible && (
              <View style={styles.infoContainer}>
                <Image
                  source={{ uri: `${server}/${museum.map}` }}
                  style={{ width: '100%', height: 250, resizeMode: 'cover' }}
                />
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  imagecontainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  caption: {
    fontSize: 33,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    width: '100%',
  },
  heading: {
    fontSize: 30,
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginLeft: 5,
    marginTop: 25,
    width: '100%',
  },
  infoContainer: {
    marginTop: 10,
    padding: 10,
    width: '100%',
  },
  infoText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    width: '100%',
  },
  touchable: {
    width: '100%',
    alignItems: 'flex-start',
  },
  line: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '100%',
  },
});
