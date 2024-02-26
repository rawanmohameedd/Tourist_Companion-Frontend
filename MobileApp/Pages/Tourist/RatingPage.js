import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Alert, TextInput, ScrollView, View, Pressable, FlatList} from 'react-native';
import { username } from './ProfilePageT';
import server from '../../elserver';

export default function SubmitRating({navigation,route}) {
    //const [Rate, onchangeRate]= useState('');
    const [Visit, OnChangeVisit] = useState('');
    const [tour_username, OnChangetour_username] = useState('');
    const [tourguide_username, OnChangetourguide_username] = useState('');
    const [DateOfTheVisit, OnChangeDateOfTheVisit] = useState('');
    const [Pending, OnPending] = useState(false);
    const [Rate, setRate] = useState('');
    const ratings = ['1', '2', '3', '4', '5'];
    const [Place, setPlace]= useState('');
    const Places = ['Pyramids','Egyptian museum','Grand Egyptian museum','Museum of civilizations','Nubian museum','Coptic museum']


    
    //tourguide Profile data from search
    const {name}= route.params

    //tourist and tourguide username from the signed in tourist profile and the profile search for tourguide
    useEffect(()=>{
        OnChangetour_username(username)
        OnChangetourguide_username(name.tourguide_username)
    },[])
    
    const rate = async () =>{
        OnPending(true)
        try {
            const response = await fetch (server + "/singleRate",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    tour_username: tour_username,
                    tourguide_username: tourguide_username,
                    rate: Rate,
                    visit: Place,
                    date_of_the_visit: DateOfTheVisit
                })
            })
            const data = await response.json()
            if (data && !data.message){
                console.log(data)
                const user = name
                console.log('yaraab2',user)
                navigation.navigate('SearchPageTG',{user: user})
                OnPending(false)
            } else {
                OnPending(false);
                alert(data.message);
            }
        } catch (error){
            console.error("Network request failed:", error);
            console.log(server + "/singleRate");
            console.log("Received rate request:", Rate, Visit, DateOfTheVisit, tour_username, tourguide_username);
            alert("Network request failed. Please try again later.");
            OnPending(false);
        }
    }
    const handleSubmmiting = () => {
        Alert.alert(
            "Submit",
            "Are you sure you want to submit this rate?",
            [
            {
                text: "Cancel",
                style: "cancel"
            },
            { text: "Yes"
                , onPress: () => rate() }
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => (
        <Pressable
          style={[styles.ratingItem, item === Rate && styles.selectedRatingItem]}
          onPress={() => setRate(item)}>
          <Text style={styles.ratingText}>{item}</Text>
        </Pressable>
      );

      const renderPlace = ({ item }) => (
        <Pressable
          style={[styles.place, item === Place && styles.selectedplace]}
          onPress={() => setPlace(item)}>
          <Text style={styles.placeText}>{item}</Text>
        </Pressable>
      );
    return (
        <View style={styles.container}>

        <Text style={styles.text}>Rate tourguide:  
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
            <FlatList
                data={Places}
                renderItem={renderPlace}
                keyExtractor={(item) => item}
                horizontal
                contentContainerStyle={styles.placesContainer}
            />    

        <TextInput
            style={styles.input}
            value={DateOfTheVisit}
            onChangeText={OnChangeDateOfTheVisit}
            placeholder={'Enter Date of the visit YYYY-MM-DD'}
        />

        <Pressable
            onPress={handleSubmmiting}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Submit </Text>
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
        marginTop: 20,
        marginBottom: 20,
      //  alignSelf: 'center',
       // justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
      },
      place: {
        margin: 10,
        padding: 10,
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
});

