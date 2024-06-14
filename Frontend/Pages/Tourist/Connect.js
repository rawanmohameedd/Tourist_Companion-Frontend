import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, ScrollView, View, Pressable} from 'react-native';
import { username } from './ProfilePageT';


export default function Connect({navigation,route}) {
    const [tour_username, OnChangetour_username] = useState('');
    const [tourguide_username, OnChangetourguide_username] = useState('');
    const [Pending, OnPending] = useState(false);

    //tourguide Profile data from search
    const {name}= route.params

    //tourist and tourguide username from the signed in tourist profile and the profile search for tourguide
    useEffect(()=>{
        OnChangetour_username(username)
        OnChangetourguide_username(name.tourguide_username)
    },[])
    
 
    const handleOneTime = () => {
      navigation.navigate('ConnectOneTime', { name });
    };
    const handleMultipleDays = () => {
      navigation.navigate('ConnectMultipleDays', { name });
    };

  
    return (
        <View style={styles.container}>

        <Text style={styles.text}>Connect to tourguide: 
        <Text style={styles.boldText}> {name.tourguide_username}</Text>
        </Text>      
        
        <ScrollView keyboardDismissMode="on-drag">
           

        <Pressable
            onPress={handleOneTime}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 30,fontWeight: 'bold'}]}> One day </Text>
        </Pressable>

        <Pressable
            onPress={handleMultipleDays}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 30,fontWeight: 'bold'}]}> Multiple days </Text>
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
    buttonContainer: {
    margin: 16,
    paddingTop: 6,
    height: 45,
    width: 350,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
    verticalAlign: 'middle',
    textAlignVertical: 'center',
    flex: 1,

    },
    text: {
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
        verticalAlign: 'middle', 
        fontSize: 30,
    },

    button: 
    {
        height: 100,
        width: 350,
        padding: 10,
        borderRadius: 300,
        margin: 5,
        color:"#E2C07C",
        backgroundColor: '#E2C07C',
        justifyContent: 'center',
        flexDirection: 'row',
        verticalAlign: 'middle',
        textAlignVertical:'center',
        alignContent: 'center',
        flex: 1,

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
});

