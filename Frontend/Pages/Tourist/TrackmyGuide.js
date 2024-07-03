import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, RefreshControl, Alert } from "react-native";
import server from "../../elserver";
import { museumName } from "../ChooseMuseum";
import { usernameT } from "./SigninT";

export default function TrackGuide (){
    const [refreshing, setRefreshing] = useState(false);
    const [rooms, setRooms] = useState([]);

    const fetchUserLocation = async ()=>{
        try{
            console.log(usernameT)
            const response = await fetch (`${server}/getMyLocation/${museumName}/${usernameT}`)
            const data = await response.text()
            return data
        } catch(error){
            console.error("Error fetching your location:", error);
        }
    }

    const fetchGuideLocation = async () => {
        try {
            const response = await fetch(`${server}/getTourguide/${usernameT}`);
            const data = await response.json();

            if (data.value.error ) {
                Alert.alert("You have not been connected to any tour guide yet.");
                return null;
            }

            if (data.value.tourguide_username) {
                const tourguide = data.value.tourguide_username
                const tourResponse= await fetch (`${server}/getMyLocation/${museumName}/${tourguide}`)
                const tourguideLocation = await tourResponse.text()
                return tourguideLocation;
            }

            console.error("Unexpected data format:", data);
            return null;
        } catch (error) {
            console.error("Error fetching your tour guide location:", error);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await fetch(`${server}/getRooms/${museumName}`);
            const data = await response.json();

            const userLocation = await fetchUserLocation()
            console.log('user location:', userLocation)

            const tourguideLocation = await fetchGuideLocation()
            console.log('tourguide location:' , tourguideLocation)

            const rooms = data.map(room => ({
                room_name: room.room_name,
                userLocation : userLocation === room.room_name ? "You are here" : null,
                tourguideLocation : tourguideLocation === room.room_name ? "Your Tour guide is here" : null
            }));

            setRooms(rooms);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchRooms();
        setRefreshing(false);
    };
    return (
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={styles.headerContainer}>
            <Text style={styles.header}>Rooms in</Text>
            <Text style={styles.header}>{museumName}</Text>
        </View>
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <View
                            key={room.room_name}
                            style={styles.roomContainer}
                        >
                            <Text style={styles.text}>{room.room_name}</Text>
                            <Text style={styles.location}>{room.userLocation}</Text>
                            <Text style={styles.location}>{room.tourguideLocation}</Text>

                        </View>
                    ))
                ) : (
                    <Text style={styles.text}>Loading...</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    text: {
        color: 'white',
        textAlign: 'left',
        marginBottom: 8,
        fontSize:20,
        fontWeight: 'bold'
    },
    location:{
        textAlign:'right',
        color: 'white'
    },
    headerContainer:{
        marginVertical: 15,
        
    },
    header:{
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight:'bold'
    },
    roomContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#333',
        height:100,
        justifyContent:'center'
    },
    green: {
        borderColor: 'green',
        borderRightWidth: 20,
        borderWidth: 1,
    },
    yellow: {
        borderColor: 'yellow',
        borderRightWidth: 60,
        borderWidth: 1,
    },
    red: {
        borderColor: 'red',
        borderRightWidth: 100,
        borderWidth: 1,
    },
});