import React from 'react';
import { View, Pressable, Text, StyleSheet , ImageBackground} from 'react-native';

export default function VisitTour  (){
    return(
    <View style={styles.container}>
    <View style={styles.top}>
        <Pressable style={[styles.item]}> 
            <ImageBackground source={(require('./../../Images/track.png'))} resizeMode="contain" style={styles.image}>
                
                <Text style={styles.text}>Track your tourists</Text>

            </ImageBackground>  
        </Pressable> 
        <Pressable style={[styles.item]}> 
            <ImageBackground source={(require('./../../Images/monument.png'))} resizeMode="cover" style={styles.image}>
                
            <Text style={styles.text}>Read monument labels</Text>

            </ImageBackground>  
        </Pressable>
    </View>
    <View style={styles.buttom}>
        <Pressable style={[styles.item]}> 
            
            <Text style={styles.text}>Tourguide data</Text>

            <ImageBackground source={(require('./../../Images/tgdata.png'))} resizeMode="contain" style={styles.imagelow}>
                
            </ImageBackground>  

        </Pressable> 

        <Pressable style={[styles.item]}> 
        <Text style={styles.text}>Crowded rooms</Text>

        <ImageBackground source={(require('./../../Images/crowd.png')) } resizeMode='center' style={styles.imagelow}>
                
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
    marginBottom: -85,

},
buttom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -85,

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
    height: '95%',
    width: '100%',

},
text:{
flex: 1,
textAlign: 'center',
marginBottom: 0,
color: 'white',

},
imagelow: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    verticalAlign: 'bottom',
    height: '95%',
    width: '100%',

   },
});