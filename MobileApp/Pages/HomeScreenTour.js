import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

export default function Home  ({navigation}){
    return (
        <View style={styles.gridContainer}>
            <Pressable style={styles.gridItem}>
            <Text style={styles.gridText}>Find a guide</Text>
            </Pressable>
            <Pressable style={styles.gridItem}
            onPress={() => navigation.navigate('Museum Info')}>
            <Text style={styles.gridText}>Museums Information</Text>
            </Pressable>
            <Pressable style={styles.gridItem}
            onPress={() => navigation.navigate('Museum Visit')}>
            <Text style={styles.gridText}>Museums visit</Text>
            </Pressable>
        </View>
        );
    };
    
    const styles = StyleSheet.create({
        gridContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

        },
        gridItem: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',

        },
        gridText: {
        fontSize: 16,
        },
        });

