import React, {useState} from 'react';
import {Text, StyleSheet, Image, TextInput, ScrollView, View, Pressable} from 'react-native';
import server from '../../elserver'

export default function SignupTG({navigation}) {
    const [Username, onchangeUsername] = useState('');
    const [Email, OnChangeEmail] = useState('');
    const [FirstName, OnChangeFirstName] = useState('');
    const [LastName, OnChangeLastName] = useState('');
    const [NationalID, OnChangeNationalID] = useState('');
    const [Birthday, OnChangeBirthday] = useState('');
    const [SpokenLanguages, OnChangeSpokenLanguages] = useState('');
    const [Password, OnChangePassword] = useState('');
    const [Pending, OnPending]= useState(false);

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
    const nationalidhandler = (value) => {
        OnChangeNationalID(value);
    };
    const birthdayhandler = (value) => {
        OnChangeBirthday(value);
    };
    const spokenlanghandler = (value) => {
        OnChangeSpokenLanguages(value);
    };
    const passwordhandler = (value) => {
        OnChangePassword(value);
    };
    
    const valid = () => {
        return true;
    };
    const signupTourguide = () => {
        if (valid()) {
            OnPending(true);
            fetch(server + "/signupTourist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                tourguide_username: Username,
                emailTG: Email,
                first_nameTG: FirstName,
                last_nameTG:LastName,
                nationalidTG:NationalID,
                birthdayTG:Birthday,
                spoken_langTG:SpokenLanguages,
                passwordTG: Password,
            }),
        })
            .then((response) => {
                navigation.navigate("Home Page tourguide")
                return response.json();
            })
            .then((res) => {
                OnPending(false);
                alert(res.message);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

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
            value={NationalID}
            onChangeText={nationalidhandler}
            placeholder={'National ID'}
        />
        <TextInput
            style={styles.input}
            value={SpokenLanguages}
            onChangeText={spokenlanghandler}
            placeholder={'Spoken Languages (use commas between languages)'}
        />
        <TextInput
            style={styles.input}
            value={Birthday}
            onChangeText={birthdayhandler}
            placeholder={'YYYY-MM-DD'}
        />
        
        <TextInput
            style={styles.input}
            onChangeText={passwordhandler}
            placeholder={'Password'}
            value={Password}
            secureTextEntry={true}
        />

        <Pressable
            onPress={()=>navigation.navigate('Home Tourguide')}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Sign up </Text>
        </Pressable>


        <Pressable style={styles.button}>
            <Image
                style={styles.icons}
                resizeMode={'contain'}
                source={require('../../Images/Google-Logo.png')}
            />
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Continue with Google </Text>
        </Pressable>
        
        <Pressable style={styles.button}>
            <Image
                style={styles.icons}
                resizeMode={'contain'}
                source={require('../../Images/facebook-logo.png')}
            />
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Continue with Facebook </Text>
        </Pressable>

        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    paddingTop: 50,
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
        color:"#E2C07C",
        backgroundColor: '#E2C07C',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});

