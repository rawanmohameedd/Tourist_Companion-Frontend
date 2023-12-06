import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert, Pressable, StyleSheet} from 'react-native';

const ForgetPasswordPage = () => {
    const [viewMenu, setViewMenu] = useState(false);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleForgetPassword = () => {
    const message = viewMenu
        ? `Phone Number: ${phoneNumber}`
        : `Email: ${email}`;
    Alert.alert('Forget Password', message);
    };

    return (
    <View style={styles.container}>
        {!viewMenu && (
        <TextInput
            style={styles.input}
            placeholder="Enter your E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
        />
        )}
        <Pressable
        style={styles.buttonContainer}
        onPress={() => setViewMenu(!viewMenu)}>
        <Text style={[styles.button, {fontSize: 20,fontWeight: 'bold'}]}>
            {viewMenu ? 'Want to use Email' : 'Want to use Mobile Number'}
        </Text>
        </Pressable>

            {viewMenu && (
            <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                />
        )}

        <Pressable
                onPress={handleForgetPassword}
                style={styles.button}>
                <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Submit </Text>
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
    buttonContainer: {
    margin: 16,
    paddingTop: 6,
    height: 45,
    width: 350,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
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
