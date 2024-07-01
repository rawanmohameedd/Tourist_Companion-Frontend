import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Alert, Modal, TextInput, ScrollView, View, Pressable, FlatList, TouchableOpacity} from 'react-native';
import { username } from './ProfilePageT';
import server from '../../elserver';
import DatePicker from 'react-native-modern-datepicker'
import { getToday , getFormatedDate } from 'react-native-modern-datepicker';

//import { TouchableOpacity , GestureHandlerRootView} from 'react-native-gesture-handler';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ConnectOneTime({navigation,route}) {
    //const [Rate, onchangeRate]= useState('');
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY-MM-DD');
    const [Visit, OnChangeVisit] = useState('');
    const [tour_username, OnChangetour_username] = useState('');
    const [tourguide_username, OnChangetourguide_username] = useState('');
    const [DateOfTheVisit, OnChangeDateOfTheVisit] = useState('');
    const [Pending, OnPending] = useState(false);
    const [Place, setPlace]= useState('');
    const Places = ['Pyramids','Egyptian museum','Grand Egyptian museum','Museum of civilizations','Nubian museum','Coptic museum']
    const [open, setOpen] = useState(false);

    const openhandlePress = () => {
      setOpen(!open);
    };

    function handleDate (propDate) {
      OnChangeDateOfTheVisit(propDate)
  };  
  
 
    
    //tourguide Profile data from search
    const {name}= route.params

    //tourist and tourguide username from the signed in tourist profile and the profile search for tourguide
    useEffect(()=>{
        OnChangetour_username(username)
        OnChangetourguide_username(name.tourguide_username)
    },[])
    
    const ConnectOneTime = async () =>{
      if (!DateOfTheVisit) {
        Alert.alert('Error', 'Please select a date of visit.');
        return;
    }
        OnPending(true)
        try {
            const response = await fetch (server + "/sentRequest",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  tour_username: tour_username,
                  tourguide_username: tourguide_username,
                  is_one_visit: true,
                  visit_date: DateOfTheVisit,
                  place: Place
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
            console.log(server + "/sentRequest");
            console.log("Received one time connect request:", Place, DateOfTheVisit, tour_username, tourguide_username);
            alert("Network request failed. Please try again later.");
            OnPending(false);
        }
    }
    const handleSubmmiting = () => {
        Alert.alert(
            "Submit",
            "Are you sure you want to submit this one day connection?",
            [
            {
                text: "Cancel",
                style: "cancel"
            },
            { text: "Yes"
                , onPress: () => ConnectOneTime() }
            ],
            { cancelable: false }
        );
    };


      const renderPlace = ({ item }) => (
        <Pressable
          style={[styles.place, item === Place && styles.selectedplace]}
          onPress={() => setPlace(item)}>
          <Text style={styles.placeText}>{item}</Text>
        </Pressable>
      );
    return (
        <View style={styles.container}>

        <Text style={styles.text}>Connect to tourguide: 
        <Text style={styles.boldText}> {name.tourguide_username}</Text>
        </Text>      
        <Text style={styles.text}> for one day </Text>      

        
        <ScrollView keyboardDismissMode="on-drag">
           
            <Text style={styles.text}> Place of visit: </Text>
            <View style={styles.placesContainer}>
              
            <FlatList
                data={Places}
                renderItem={renderPlace}
                keyExtractor={(item) => item}
                horizontal
                contentContainerStyle={[styles.placesContainer]}
                //style={{ height: 150 }}
            />
            </View>
        

        <TouchableOpacity onPress={openhandlePress} style={styles.Date}>
          <Text style={styles.calendarButton}>   Date of visit: {DateOfTheVisit} </Text>
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent= {true}
          visible= {open}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <DatePicker 
                mode= 'calendar'
                selected={DateOfTheVisit}
                minimumDate={startDate}
                onSelectedChange={handleDate} 
                />

                <TouchableOpacity onPress={openhandlePress} style={styles.Date}>
                    <Text style={{color: 'black'}}>save</Text>
                </TouchableOpacity>
              </View>

            </View>
          
        </Modal>

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

