import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import server from "../elserver"; 
import { museumName } from "./ChooseMuseum";

export default function DisplayCrowdedRooms() {
    const [refreshing, setRefreshing] = useState(false);
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        try {
            const response = await fetch(`${server}/getRooms/${museumName}`);
            const data = await response.json();
            setRooms(data);
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
                <Text style={styles.text}>Rooms in {museumName}</Text>
                {rooms.map((room) => (
                    <View key={room.room_number} style={styles.roomContainer}>
                        <Text style={styles.text}>Room Name: {room.room_name}</Text>
                        <Text style={styles.text}>Average Capacity: {room.avg_capacity}</Text>
                        <Text style={styles.text}>Full Capacity: {room.full_capacity}</Text>
                    </View>
                ))}
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
});
