import React,{useState} from 'react';
import { View, Pressable, Text, StyleSheet , Image , ImageBackground, TouchableOpacity} from 'react-native';
import Table from './ticketstable';


export default function Infopage({ navigation }) {


    const [containerVisible, setContainerVisible] = useState(false);
  
    const handlePress = () => {
      // Toggle the visibility of the container
      setContainerVisible(!containerVisible);
    };
  
    return (
        <>
        <View style={styles.container}>
        <View style={styles.imagecontainer}>
            <ImageBackground 
                style={styles.image}
                resizeMode={'contain'}
                source={require('./../Images/grand-egyprion-museum.jpg')}>

                <Text style={styles.caption}> Grand Egyptian museum </Text>
            </ImageBackground>  
        </View>


        <View style={{ flex: 1, justifyContent: 'left', alignItems: 'left' , width: 390 }}>

            <TouchableOpacity onPress={handlePress}>
                <Text style={{ fontSize: 25, color: 'white' , borderBottomColor: 'white' , borderBottomWidth: 2}}>Tickets prices</Text>
            </TouchableOpacity>
  
            {containerVisible && (
                <View style={{ marginTop: 20, padding: 10}}>
                    <Table style={styles.historytable}>

                    </Table>
                </View>
            )}
      </View>
        
      </View>
        
        </>
    


    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#121212',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      color: 'white',
    },
    image: {
      width: 400,
      height: 200,
      marginTop: 0,
      marginBottom: 16,
      resizeMode: 'contain',
    },
    buttonContainer: {
      height: 200,
      width: 300,
      marginBottom: 16,
    },
    buttontext: {
      color: 'black',  
      textAlign: 'center',
    },
    button: {
      height: 50,
      width: 250,
      padding: 10,
      borderRadius: 300,
      margin: 10,
      color:"#E2C07C",
      backgroundColor: '#E2C07C',
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
  
    },
    buttonSpacer: {
      height: 16,
    },
    caption: {
        flex: 1,
        textAlign: 'left',
        textAlignVertical: 'bottom',
        fontSize: 33,
        fontWeight: 'bold',
        textShadowColor: 'white',
        textShadowRadius: 10,

    },
  });
