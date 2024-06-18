import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Alert, Modal, ScrollView, View, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { username } from './ProfilePageT';
import server from '../../elserver';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';

export default function SubmitRating({ navigation, route }) {
  const today = new Date();
  const endDate = getFormatedDate(today.setDate(today.getDate() - 1), 'YYYY-MM-DD');
  const [Visit, OnChangeVisit] = useState('');
  const [tour_username, OnChangetour_username] = useState('');
  const [tourguide_username, OnChangetourguide_username] = useState('');
  const [DateOfTheVisit, OnChangeDateOfTheVisit] = useState('');
  const [Pending, OnPending] = useState(false);
  const [Rate, setRate] = useState('');
  const ratings = ['1', '2', '3', '4', '5'];
  const [Place, setPlace] = useState('');
  const [open, setOpen] = useState(false);
  const [Places, setData] = useState([]);

  const openhandlePress = () => {
    setOpen(!open);
  };

  function handleDate(propDate) {
    OnChangeDateOfTheVisit(propDate);
  }

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

  const { name } = route.params;

  useEffect(() => {
    OnChangetour_username(username);
    OnChangetourguide_username(name.tourguide_username);
  }, [username, name]);

  const rate = async () => {
    if (!DateOfTheVisit) {
      Alert.alert('Error', 'Please select a date of visit.');
      return;
    }
    OnPending(true);
    try {
      const response = await fetch(`${server}/singleRate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tour_username: tour_username,
          tourguide_username: tourguide_username,
          rate: Rate,
          visit: Place,
          date_of_the_visit: DateOfTheVisit
        })
      });
      const data = await response.json();
      if (data && !data.message) {
        const user = name;
        navigation.navigate('SearchPageTG', { user: user });
        OnPending(false);
      } else {
        OnPending(false);
        alert(data.message);
      }
    } catch (error) {
      console.error('Network request failed:', error);
      alert('Network request failed. Please try again later.');
      OnPending(false);
    }
  };

  const handleSubmitting = () => {
    Alert.alert(
      'Submit',
      'Are you sure you want to submit this rate?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => rate()
        }
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={[styles.ratingItem, item === Rate && styles.selectedRatingItem]}
      onPress={() => setRate(item)}
    >
      <Text style={styles.ratingText}>{item}</Text>
    </Pressable>
  );

  const renderPlace = ({ item }) => (
    <Pressable
      style={[styles.place, item.title === Place && styles.selectedplace]}
      onPress={() => setPlace(item.title)}
    >
      <Text style={styles.placeText}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rate tour guide:
        <Text style={styles.boldText}> {name.tourguide_username}</Text>
      </Text>
      <ScrollView keyboardDismissMode="on-drag">
        <FlatList
          data={ratings}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          horizontal
          contentContainerStyle={styles.ratingContainer}
        />
        <Text style={styles.text}> Place of visit: </Text>
        <View style={styles.placesContainer}>
          <FlatList
            data={Places}
            renderItem={renderPlace}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={styles.placesContainer}
          />
        </View>
        <TouchableOpacity onPress={openhandlePress} style={styles.dateButton}>
          <Text style={styles.calendarButton}>Date of visit: {DateOfTheVisit}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode="calendar"
                selected={DateOfTheVisit}
                maximumDate={endDate}
                onSelectedChange={handleDate}
              />
              <TouchableOpacity onPress={openhandlePress} style={styles.saveButton}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={handleSubmitting}
          style={styles.button}
        >
          <Text style={[styles.buttonText, { fontSize: 20, fontWeight: 'bold' }]}>Submit</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    paddingTop: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    },
    input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    },
    buttonContainer: {
    margin: 16,
    paddingTop: 6,
    height: 45,
    width: 350,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
    },
    text:
    {
    textAlign: 'center',
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    },

    icons: 
    {
        height:30,
        width:40,
    },

    buttontext: 
    {
        color: 'black',  
    },

    button: 
    {
        height: 50,
        width: 350,
        padding: 10,
        borderRadius: 300,
        margin: 5,
        color:"#E2C07C",
        backgroundColor: '#E2C07C',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        marginBottom: 16,
    },
    boldText: {
        fontWeight: 'bold',
    },
    ratingContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
      },
      ratingItem: {
        margin: 10,
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      },
      selectedRatingItem: {
        backgroundColor: '#E2C07C',
      },
      ratingText: {
        color: 'white',
        fontSize: 20,
      },
      placesContainer: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 20,
      //  alignSelf: 'center',
       // justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
       // height: 150,
      },
      place: {
        margin: 5,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        width: '90%',
        borderColor: 'white',
      //  alignSelf: 'center',
      //  alignContent: 'left',
     //   justifyContent: 'left',
      },
      selectedplace: {
        backgroundColor: '#E2C07C',
      },
      placeText: {
        color: 'white',
        fontSize: 15,
      },
      text: {
        fontSize: 15,
        color: 'white',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      calendarButton: {
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        width: '90%',
        height: 40,
        alignSelf: 'center',
        textAlign: 'left',
        marginBottom: 15,
        textAlignVertical: 'center',
      },
      displayedDate: {
        backgroundColor: 'white',
        color: 'white',
        width: '90%',
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 40,
        margin: 10,
      },
});

