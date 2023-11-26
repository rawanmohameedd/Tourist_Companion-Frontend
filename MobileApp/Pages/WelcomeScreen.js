/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, ImageBackground, Image, Button, View} from 'react-native';

export default function WelcomeApp({navigation}) {
    return (
    <>
        <View style={styles.container}>
        <Image style={styles.image} source={require('../Images/Logo.png')} />
        <View style={styles.buttonContainer}>
            <Button
            style={styles.button} 
            title="Sign in"
            titleStyle={styles.buttonText}
            color="#E2C07C"
            />
            <View style={styles.buttonSpacer} />
            <Button
            title="Create Tourist account" 
            titleStyle={styles.buttonText}
            color="#E2C07C" 
            onPress={() => navigation.navigate('Sign up as Tour')}
            />
            <View style={styles.buttonSpacer} />
            <Button
            title="Create Tour guide account"
            titleStyle={styles.buttonText}
            color="#E2C07C" 
            onPress={() => navigation.navigate('Sign up as Tour guide')}
            />
        </View>
        </View>
    </>
    );
}
const styles = StyleSheet.create({
    container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    bgImage:{
        flex:1,
        justifyContent:'center',
    },
    title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
    },
    image: {
    width: 300,
    height: 200,
    marginTop:0,
    marginBottom: 16,
    resizeMode:'contain',
    },
    buttonContainer: {
    height: 200,
    width: 300,
    marginBottom: 16,
    },
    buttonText: {
    color: 'black',
    },
    button: {
    padding: 10,
    borderRadius: 500,
    },
    buttonSpacer: {
    height: 16,
    },
});

