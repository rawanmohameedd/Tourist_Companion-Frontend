import React from 'react';
import { View, Pressable, Text, StyleSheet , ImageBackground,Image, } from 'react-native';

export default function VisitTour  ({navigation}){
    return(
    <View style={styles.container}>
    <View style={styles.top}>
        <Pressable style={[styles.item]}> 
            <ImageBackground source={(require('./../../Images/track.jpg'))} resizeMode="cover" style={styles.image}>
            <Image source={(require('./../../Images/track.png'))} resizeMode='cover'>
                
                </Image> 
                <Text style={styles.text}>Track your guide</Text>

            </ImageBackground> 
           
        </Pressable> 
        <Pressable 
            style={[styles.item]}
            onPress={()=> navigation.navigate('NFCread')}> 
                <ImageBackground source={(require('./../../Images/monumentlabel.jpg'))} resizeMode="cover" style={styles.image}>
                    <Image source={(require('./../../Images/monument.png'))} resizeMode='contain' style={styles.data}>
                    
                    </Image> 
                    <Text style={styles.text}>Read monument labels</Text>

                </ImageBackground>  
        </Pressable>
    </View>
    <View style={styles.buttom}>
        <Pressable 
            style={[styles.item]}
            onPress={()=> navigation.navigate('NFCreadTG')}> 
            

            <ImageBackground source={(require('./../../Images/data.jpg'))} resizeMode="cover" style={styles.imagelow}>
                <Image source={(require('./../../Images/tgdata.png'))} resizeMode='center' style={styles.data}>
                
                </Image> 
                <Text style={styles.text}>Tourguide data</Text>

            </ImageBackground>  

        </Pressable> 

        <Pressable style={[styles.item]} onPress={()=>{
            navigation.navigate("Crowd Rooms")
        }}> 

        <ImageBackground source={(require('./../../Images/room.jpg')) } resizeMode='cover' style={styles.imagelow}>
            <Image source={(require('./../../Images/crowd.png'))} resizeMode='center' style={styles.data}>
                
                </Image> 
            <Text style={styles.text}>Crowded rooms</Text>

        </ImageBackground>  
                

        </Pressable> 
    </View>
    </View>
)
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
},
top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -95,

},
buttom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -95,

},
item: {
    backgroundColor: 'black',
    width: '45%',
    height: '65%',
    margin: 5,
    alignContent: 'center',
    alignItems: 'center',
},
image: {
    alignItems:'center',
    alignSelf: 'center',
    alignContent: 'center',
    height: '100%',
    width: '100%',

},
text:{
flex: 1,
textAlign: 'center',
color: 'white',
textAlignVertical: 'bottom',
fontWeight: 'bold',
fontSize: 17,
textShadowColor:'black',
textShadowRadius: 5,
marginBottom: 20.

},
imagelow: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    verticalAlign: 'bottom',
    height: '100%',
    width: '100%',
   },
data: {
    height: '80%',
    width: '80%',
},
});