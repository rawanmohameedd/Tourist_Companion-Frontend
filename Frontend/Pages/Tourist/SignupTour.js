import React, {useState} from 'react';
import {Text, StyleSheet, Image, TextInput, ScrollView, View, Pressable, Linking, TouchableOpacity, Modal} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import server from '../../elserver';
import DatePicker from 'react-native-modern-datepicker'
import { getToday , getFormatedDate } from 'react-native-modern-datepicker';

export default function SignupT() {
    const today = new Date();
    const endDate = getFormatedDate(today.setDate(today.getDate() - 1), 'YYYY-MM-DD');
    const [Username, onchangeUsername]= useState('');
    const [Email, OnChangeEmail] = useState('');
    const [FirstName, OnChangeFirstName] = useState('');
    const [LastName, OnChangeLastName] = useState('');
    const [Nationality, OnChangeNationality] = useState('');
    const [Birthday, OnChangeBirthday] = useState('');
    const [Password, OnChangePassword] = useState('');
    const [Pending, OnPending] = useState(false);
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [webViewVisible, setWebViewVisible] = useState(false);

    const openhandlePress = () => {
        setOpen(!open);
      }; 

    const usernameHandler = (value) => {
        onchangeUsername(value);
    };
    const emailhandler = (value) => {
        OnChangeEmail(value);
    };
    const first_Namehandler = (value) => {
        OnChangeFirstName(value);
    };
    const last_Namehandler = (value) => {
        OnChangeLastName(value);
    };
    const nationalityhandler = (value) => {
        OnChangeNationality(value);
    };
    const birthdayhandler = (value) => {
        OnChangeBirthday(value);
    };
    const passwordhandler = (value) => {
        OnChangePassword(value);
    };

    const navigation = useNavigation();

    const signup = async () => {
        OnPending(true);
        try {
            const response = await fetch(server + "/signupT", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tour_username: Username,
                    emailT: Email,
                    first_nameT: FirstName,
                    last_nameT:LastName,
                    nationalityT:Nationality,
                    birthdayT:Birthday,
                    passwordT: Password,
                }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                await EncryptedStorage.setItem("token", data.token);
                OnPending(false);
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name:'Home Tourist'}]
                    }), {
                    token: data.token,
                });
            } else {
                OnPending(false);
                alert(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Network request failed:", error);
            alert("Network request failed. Please try again later.");
            OnPending(false);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            // const response = await axios.get('http://192.168.1.103:3000/auth/facebook');
            const facebookAuthUrl = 'https://www.facebook.com/v13.0/dialog/oauth?' +
                'client_id=1128288548204177' +
                `&redirect_uri=${server}/auth/facebook/callback` +
                '&scope=email';
            Linking.openURL(facebookAuthUrl);
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }

    }



    return (
        <View style={styles.container}>
        <ScrollView keyboardDismissMode="on-drag">
        <TextInput
            style={styles.input}
            value={Username}
            onChangeText={usernameHandler}
            placeholder={'Username'}
        />
        <TextInput
            style={styles.input}
            value={Email}
            onChangeText={emailhandler}
            placeholder={'Email address'}
            keyboardType="email-address"
        />
        <TextInput
            style={styles.input}
            value={FirstName}
            onChangeText={first_Namehandler}
            placeholder={'First Name'}
        />

        <TextInput
            style={styles.input}
            value={LastName}
            onChangeText={last_Namehandler}
            placeholder={'Last Name'}
        />

        <TextInput
            style={styles.input}
            value={Nationality}
            onChangeText={nationalityhandler}
            placeholder={'Nationality'}
        />

        <TouchableOpacity onPress={openhandlePress} style={styles.Date}>
            <Text style={styles.calendarButton}>    Date of birth: {Birthday} </Text>
        </TouchableOpacity>

        <Modal
        animationType='slide'
        transparent= {true}
        visible= {open}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>

                <DatePicker 
                mode= 'calendar'
                selected={Birthday}
                maximumDate={endDate}
                onSelectedChange={birthdayhandler} 
                />

                <TouchableOpacity onPress={openhandlePress} style={styles.Date}>
                    <Text>save</Text>
                </TouchableOpacity>
            </View>

            </View>
        
        </Modal>

        <TextInput
            style={styles.input}
            onChangeText={passwordhandler}
            placeholder={'Password'}
            value={Password}
            secureTextEntry={true}
        />

        <Pressable
            onPress={signup}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Sign up </Text>
        </Pressable>

                <Pressable style={styles.button}>
                    <Image
                        style={styles.icons}
                        resizeMode={'contain'}
                        source={require('../../Images/Google-Logo.png')}
                    />
                    <Text style={[styles.buttontext, { fontSize: 20, fontWeight: 'bold' }]}> Continue with Google </Text>
                </Pressable>

                <Pressable style={styles.button} onPress={handleFacebookLogin}>
                    <Image
                        style={styles.icons}
                        resizeMode={'contain'}
                        source={require('../../Images/facebook-logo.png')}
                    />
                    <Text style={[styles.buttontext, { fontSize: 20, fontWeight: 'bold' }]}> Continue with Facebook </Text>
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
        backgroundColor: '#E2C07C',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text:
    {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    icons:
    {
        height: 30,
        width: 40,
    },

    buttontext:
    {
        color: 'black',
    },

    button:
    {
        height: 50,
        width: 350,
        padding: 10,
        borderRadius: 300,
        margin: 5,
        color: "#E2C07C",
        backgroundColor: '#E2C07C',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      calendarButton: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',
        height: 40,
        alignSelf: 'center',
        textAlign: 'left',
        marginBottom: 16,
        textAlignVertical: 'center',
      },
      displayedDate: {
    //    backgroundColor: 'white',
        color: 'black',
        //width: '90%',
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 40,
        marginTop: 10,
      },
      bdtext: {
        textAlign: 'left',
        color: 'white',
        fontSize: 15,
      },
});

