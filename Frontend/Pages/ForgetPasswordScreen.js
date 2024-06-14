import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Pressable, StyleSheet} from 'react-native';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleForgetPassword = () => {
        Alert.alert('Forget Password', `Email: ${email}`);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your E-mail"
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <Pressable
                onPress={handleForgetPassword}
                style={styles.button}>
                <Text style={[styles.buttontext, {fontSize: 20, fontWeight: 'bold'}]}> Submit </Text>
            </Pressable>
        </View>
    );
};

export default ForgetPasswordPage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    buttontext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    input: {
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        width: 350,
    },
    button: {
        height: 50,
        width: 250,
        padding: 10,
        borderRadius: 300,
        margin: 10,
        backgroundColor: '#E2C07C',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
    },
});
