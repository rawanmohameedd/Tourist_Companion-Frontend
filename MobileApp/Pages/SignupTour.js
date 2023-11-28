/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */

import React, {useState} from 'react';
import {Text, StyleSheet, Image, TextInput, ScrollView, View, Pressable} from 'react-native';



export default function EnterEmailUPT({navigation}) {
    const [FirstName, OnChangeFirstName] = useState('');
    const [LastName, OnChangeLastName] = useState('');
    const [PhoneNumber, OnChangePhoneNumber] = useState('');
    const [Birthday, OnChangeBirthday] = useState('');
    const [Email, OnChangeEmail] = useState('');
    const [Password, OnChangePassword] = useState('');

    return (
    <View style={styles.container}>
        <ScrollView keyboardDismissMode="on-drag">
        <TextInput
            style={styles.input}
            value={FirstName}
            onChangeText={OnChangeFirstName}
            placeholder={'First Name'}
        />
        <TextInput
            style={styles.input}
            value={LastName}
            onChangeText={OnChangeLastName}
            placeholder={'Last Name'}
        />
        <TextInput
            style={styles.input}
            value={PhoneNumber}
            onChangeText={OnChangePhoneNumber}
            placeholder={'Phone number'}
            keyboardType="phone-pad"
        />
        <TextInput
            style={styles.input}
            value={Birthday}
            onChangeText={OnChangeBirthday}
            placeholder={'Date of birth'}
        />
        <TextInput
            style={styles.input}
            value={Email}
            onChangeText={OnChangeEmail}
            placeholder={'Email address'}
            keyboardType="email-address"
        />
        <TextInput
            style={styles.input}
            onChangeText={OnChangePassword}
            placeholder={'Password'}
            value={Password}
            secureTextEntry={true}
        />
        <Pressable style={styles.buttonContainer} 
        onPress={() => navigation.navigate('Home Page')}>
            <Text style={styles.text}>Sign up</Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} >
            <Image
            style={styles.icons}
            resizeMode={'contain'}
            source={require('../Images/Google-Logo.png')}/>
            <Text style={styles.text}>Continue with Google</Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} >
            <Image
            style={styles.icons}
            resizeMode={'contain'}
            source={require('../Images/facebook-logo.png')}/>
            <Text style={styles.text}>Continue with Facebook</Text>
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
    input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    },
    buttonContainer: {
    margin: 16,
    paddingTop: 6,
    height: 45,
    width: 350,
    backgroundColor: '#512B81',
    flexDirection: 'row',
    justifyContent: 'center',
    },
    text: {
    textAlign: 'center',
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    },
    icons: {
        height:30,
        width:40,
    },
});

