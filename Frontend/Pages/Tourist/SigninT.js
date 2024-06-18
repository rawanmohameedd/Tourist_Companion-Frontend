import React, {useState} from 'react';
import {StyleSheet, TextInput, ScrollView, View, Pressable ,Text} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import server from "../../elserver";

export let usernameT 
export default function SigninT() {
    const [Email, OnChangeEmail] = useState('');
    const [Password, OnChangePassword] = useState('');
    const [pending, OnPending] = useState(false);

    function EmailHandler(vaLue) {
        return OnChangeEmail(vaLue);
    }
    function PasswordHandler(vaLue) {
        return OnChangePassword(vaLue);
    }
    const navigation = useNavigation();

    // Fetch Sign in request
    const signin = async () => {
        OnPending(true);
        try {
            const response = await fetch(server + "/signinT", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emailT: Email,
                    passwordT: Password,
                }),
            });
            const data = await response.json();
            
            console.log("Server response:", data); // Log server response for debugging
    
            if (response.ok && data.token) {
                usernameT = data.value.tour_username
                console.log(usernameT)
                await EncryptedStorage.setItem("token", data.token);
                OnPending(false);
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Home Tourist' }]
                    }), {
                    token: data.token,
                });
            } else {
                OnPending(false);
                alert(data.message || "Sign-in failed. Please check your email and password.");
            }
        } catch (error) {
            console.error("Network request failed:", error);
            console.log(server + "/signinT");
            console.log("Received sign-in request:", Email, Password);
            alert("Network request failed. Please try again later.");
            OnPending(false);
        }
    };
    
    
    
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
            onPress={()=> navigation.navigate('Sign up as a tourist')}
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

