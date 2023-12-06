import React from 'react';
import { View, Pressable, Text, StyleSheet , Image , ImageBackground} from 'react-native';

export default function HomeT ({navigation}){
    return (
        <View style={styles.gridContainer}>
            <Pressable style={styles.button}>
                <ImageBackground 
                    style={styles.icons}
                    resizeMode={'contain'}
                    source={require('../../Images/findtg.jpg')}>
                    <Text style={styles.gridText}>Tourist requests</Text>
                    </ImageBackground>
            </Pressable>

            <Pressable style={styles.button}
                onPress={() => navigation.navigate('Museum Info')}>
                <ImageBackground 
                    style={styles.icons}
                    resizeMode={'contain'}
                    source={require('../../Images/info.jpg')}>
                    <Text style={styles.gridText}>Museums Information</Text>
                </ImageBackground>
                    
                
            </Pressable>

            <Pressable style={styles.button}
                onPress={() => navigation.navigate('Museum Visit')}>
                <ImageBackground 
                style={styles.icons}
                resizeMode={'contain'}
                source={require('../../Images/visit.jpg')}>
                <Text style={styles.gridText}>Museum visit</Text>
            </ImageBackground>
            </Pressable>
        </View>
        );
    };
    
    const styles = StyleSheet.create({
        gridContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#121212',

        },
        button: {
        //flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        //height: 275,
        //width: 410,
        borderRadius: 10,

        },
        gridText: {
        fontSize: 30,
        textAlignVertical:'center',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'white',
        textShadowRadius: 10,
        },
        icons:{
        height: 275,
        width: 400,
        borderRadius:100,
        justifyContent: 'center',
        alignContent: 'center',
        },
        });

