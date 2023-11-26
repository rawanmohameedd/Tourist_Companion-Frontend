import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert, Pressable, StyleSheet} from 'react-native';
import Footer from '../Components/Footer';

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
            placeholder="Enter your email you want to send verification code for"
            value={email}
            onChangeText={text => setEmail(text)}
        />
        )}
        <Pressable
        style={styles.buttonContainer}
        onPress={() => setViewMenu(!viewMenu)}>
        <Text style={styles.buttonText}>
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
        <View style={styles.submitButton}>
        <Button color="#512B81" title="Submit" onPress={handleForgetPassword} />
        </View>
        <Footer/>
    </View>
    );
};

export default ForgetPasswordPage;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4477CE',
    },
    buttonContainer: {
    margin: 16,
    paddingTop: 6,
    height: 45,
    width: 350,
    backgroundColor: '#512B81',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    },
    buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    },
    input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    width: 350,
    },
    submitButton: {
    marginVertical: 16,
    width: 200,
    },
});
