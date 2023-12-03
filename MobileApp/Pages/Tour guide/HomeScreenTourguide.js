import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

export default function HomeTG ({navigation}){
    return (
        <View style={styles.gridContainer}>
            <Text>deh bta3t tour guide</Text>
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

