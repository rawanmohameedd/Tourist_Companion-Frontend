/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
export default function Footer() {
    return (
    <View style={styles.footer}>
        <Text style={styles.footerText}>Graduation Project 2024</Text>
    </View>
    );
}
const styles = StyleSheet.create({
    footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#512B81',
    paddingVertical: 8,
    paddingHorizontal: 16,
    },
    footerText: {
    fontSize: 16,
    fontWeight:'bold',
    textAlign: 'center',
    color: 'white',
    },
});

