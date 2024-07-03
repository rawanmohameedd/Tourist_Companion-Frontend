import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import server from "../elserver";
import { museumName } from "./ChooseMuseum";

export default function DisplayCrowdedRooms() {
    const [refreshing, setRefreshing] = useState(false);
    const [rooms, setRooms] = useState([]);

    const currentCapacity = async () => {
        try {
            const response = await fetch(`${server}/currentCapacity/${museumName}`);
            const current = await response.json();
            return current;
        } catch (error) {
            return { error: "Can't fetch current capacities" };
        }
    };

    const colorMap = async () => {
        try {
            const response = await fetch(`${server}/crowdColors/${museumName}`);
            const color = await response.json();
            return color;
        } catch (error) {
            return { error: "Can't get the color map for these rooms" };
        }
    };

    useEffect(() => { colorMap() }, []);

    const fetchRooms = async () => {
        try {
            const response = await fetch(`${server}/getRooms/${museumName}`);
            const data = await response.json();

            const currentCapacities = await currentCapacity();
            const roomColorMap = await colorMap();

            const roomsWithCapacity = data.map(room => ({
                room_name: room.room_name,
                avg_capacity: room.avg_capacity,
                full_capacity: room.full_capacity,
                current_capacity: currentCapacities[room.room_name] || 0,
                room_color: roomColorMap[room.room_name] || 1
            }));

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
            <View style={styles.headerContainer}>
            <Text style={styles.header}>Rooms in</Text>
            <Text style={styles.header}>{museumName}</Text>
        </View>
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <View
                            key={room.room_name}
                            style={[
                                styles.roomContainer,
                                room.room_color === 1 && styles.green,
                                room.room_color === 2 && styles.yellow,
                                room.room_color === 3 && styles.red,
                            ]}
                        >
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
    headerContainer:{
        marginVertical: 15,
    },
    header:{
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight:'bold'
      //  marginTop: 10,
    },
    roomContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#333',
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
