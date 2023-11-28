/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, TextInput, ScrollView, Button, View, Pressable ,Text} from 'react-native';

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
            placeholder={'mobile number or Email'}
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
            
            <Pressable
            onPress={()=> navigation.navigate('Home Page')}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Sign in </Text>
            </Pressable>

            <Pressable
            onPress={()=> navigation.navigate('Sign up as Tour')}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Don't have an account yet? </Text>
            </Pressable>

            <Pressable
            onPress={()=> navigation.navigate('Forget your Password')}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Forgot your password? </Text>
            </Pressable>
            

            
        </View>
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
    textAlign: 'center',
    },
    buttonContainer: {
    marginBottom: 16,
    },
    buttontext: {
        color: 'black',
        
      },
    button: {
        height: 50,
        width: 250,
        padding: 10,
        borderRadius: 300,
        margin: 5,
        color:"#E2C07C",
        backgroundColor: '#E2C07C',
        flexDirection: 'row',
        justifyContent: 'center',
    
      },
    buttonSpacer: {
    height: 16,
    },
});

