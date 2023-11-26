/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, TextInput, ScrollView, Button, View} from 'react-native';
import Footer from '../Components/Footer';

export default function EnterEmailIN({navigation}) {
    const [Email, OnChangeEmail] = useState('');
    const [Password, OnChangePassword] = useState('');

    return (
    <View style={styles.container}>
        <ScrollView keyboardDismissMode="on-drag">
        <TextInput
            style={styles.input}
            value={Email}
            onChangeText={OnChangeEmail}
            placeholder={'Mobile number or Email'}
            keyboardType='email-address'
        />
        <TextInput
            style={styles.input}
            onChangeText={OnChangePassword}
            placeholder={'Password'}
            value={Password}
            secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
            <Button title="Sign in" 
            color="#512B81" 
            onPress={() => navigation.navigate('Home Page')}/>

            <View style={styles.buttonSpacer} />
            <Button 
            title="Don't have an account yet?" 
            color="#512B81" 
            onPress={() => navigation.navigate('Sign up as Tour')}
            />

            <View style={styles.buttonSpacer} />
            <Button 
            title="Forget your password?" 
            color="#512B81" 
            onPress={() => navigation.navigate('Forget your Password')}
            />
        </View>
        </ScrollView>
        <Footer/>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    paddingTop: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4477CE',
    },
    input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    },
    buttonContainer: {
    marginBottom: 16,
    },
    buttonSpacer: {
    height: 16,
    },
});

