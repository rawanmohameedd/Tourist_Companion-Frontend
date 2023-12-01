/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, TextInput, ScrollView, View, Pressable ,Text} from 'react-native';
import * as SecureStore from "expo-secure-store";
import server from "../elserver";

export default function EnterEmailIN({navigation}) {
    const [Email, OnChangeEmail] = useState('');
    const [Password, OnChangePassword] = useState('');
    const [pending, OnPending] = useState(false);

    function EmailHandler(vaLue) {
        return OnChangeEmail(vaLue);
    }
    function PasswordHandler(vaLue) {
        return OnChangePassword(vaLue);
    }
    const signin = async()=> {
        OnPending(true);
        fetch(server+"/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            email: Email,
            password: Password,
        }),
        })
        .then((res) => {
            return res.json();
        })
        .then(async (response) => {
            if (response.email) {
                await SecureStore.setItemAsync("token", response.token);
                OnPending(false);
                navigation.navigate("Home Page", {
                token: response.token,
            });
            } else {
                OnPending(false);
                alert(response.message);
            }
        })
        .catch((error) => {
            console.log(error);
            console.log(server + "/signin");
            console.log("Received sign-in request:", Email, Password);
            alert("Network request failed. Please try again later.");
        });
    }
    
    return (
    <View style={styles.container}>
        <ScrollView keyboardDismissMode="on-drag">
        <TextInput
            style={styles.input}
            value={Email}
            onChangeText={EmailHandler}
            placeholder={'Email'}
            keyboardType='email-address'
        />
        <TextInput
            style={styles.input}
            onChangeText={PasswordHandler}
            placeholder={'Password'}
            value={Password}
            secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
            
            <Pressable
            onPress={signin}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Sign in </Text>
            </Pressable>

            <Pressable
            onPress={()=> navigation.navigate('Welcome')}
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

