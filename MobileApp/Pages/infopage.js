import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import server from '../elserver';

export default function Infopage({ route }) {
  const [museum, setMuseum] = useState(null);
  const [TcontainerVisible, setTContainerVisible] = useState(false);
  const [IcontainerVisible, setIContainerVisible] = useState(false);
  const [McontainerVisible, setMContainerVisible] = useState(false);

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

  useEffect(() => {
    const fetchMuseum = async () => {
      try {
        const response = await fetch(`${server}/museum/${musid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch museum');
        }
        const data = await response.json();
        setMuseum(data.value);
        console.log(`${server}/${museum.musuem_image}`)
        console.log(`${server}/${museum.map}`)
      } catch (error) {
        console.error('Error fetching museum:', error.message);
      }
    };

    fetchMuseum();
  }, [musid]);

  return (
    <>
      {museum && (
        <View style={styles.container}>
        <ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagecontainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  caption: {
    fontSize: 33,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  heading: {
    fontSize: 30,
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginLeft: 5,
    marginTop: 25,
  },
  infoContainer: {
    marginTop: 10,
    padding: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  touchable: {
    width: '100%',
    alignItems: 'flex-start',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
  },
});
