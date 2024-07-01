import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import server from "../elserver"; 
import { museumName } from "./ChooseMuseum";

export default function DisplayCrowdedRooms() {
    const [refreshing, setRefreshing] = useState(false);
    const [rooms, setRooms] = useState([]);

    const currentCapacity = async ()=>{
        try{
            const response = await fetch (`${server}/currentCapacity/${museumName}`)
            const current = await response.json()
            
            console.log('current ', current)
            return current
        } catch (error){
            return {error : "Can't fetch current capacities"}
        }
    }

useEffect (()=>{ currentCapacity()},[])
    const fetchRooms = async () => {
        try {
            const response = await fetch(`${server}/getRooms/${museumName}`);
            const data = await response.json();

            console.log('Initial room data:', data);
            
            const currentCapacities = await currentCapacity();

            // Map through roomsData and add current_capacity from currentCapacities
            const roomsWithCapacity = data.map(room => ({
                room_name: room.room_name,
                avg_capacity: room.avg_capacity,
                full_capacity: room.full_capacity,
                current_capacity: currentCapacities[room.room_name] || 0
            }));

            console.log('Rooms with current capacity:', roomsWithCapacity);
            setRooms(roomsWithCapacity);
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

    useEffect(() => {
        console.log('Rooms state updated:', rooms);
        console.log('Museum Name:', museumName);
    }, [rooms]);

    return (
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text style={styles.text}>Rooms in {museumName}</Text>
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <View key={room.room_number} style={[styles.roomContainer, room.colormap && styles[room.colormap]]}>
                            <Text style={styles.text}>{room.room_name}</Text>
                            <Text style={styles.text}>Average Capacity: {room.avg_capacity}</Text>
                            <Text style={styles.text}>Full Capacity: {room.full_capacity}</Text>
                            <Text style={styles.text}>Current Capacity: {room.current_capacity}</Text>
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
        marginBottom: 8,
    },
    roomContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#1e1e1e',
    },
    green: {
        backgroundColor: 'green',
    },
    yellow: {
        backgroundColor: 'yellow',
    },
    red: {
        backgroundColor: 'red',
    },
});
