import React from 'react';
import { View, Pressable, Text, StyleSheet , ImageBackground} from 'react-native';

export default function VisitTour  (){
    return(
    <View style={styles.container}>
    <View style={styles.row}>
        <Pressable style={[styles.item, styles.firstItem]}> 
            <ImageBackground source={(require('./../../Images/track.png'))} resizeMode="cover" style={styles.image}>
                
                <Text style={styles.text}>Track your guide</Text>

            </ImageBackground>  
        </Pressable> 
        <Pressable style={[styles.item, styles.secondItem]}> 
            <ImageBackground source={(require('./../../Images/monument.jpg'))} resizeMode="cover" style={styles.image}>
                
            <Text style={styles.text}>Read monument labels</Text>

            </ImageBackground>  
        </Pressable>
    </View>
    <View style={styles.row}>
        <Pressable style={[styles.item, styles.thirdItem]}> 
            
            <Text style={styles.text}>Tourguide data</Text>

            <ImageBackground source={(require('./../../Images/tgdata.png'))} resizeMode="center" style={styles.imagelow}>
                
            </ImageBackground>  

        </Pressable> 

        <Pressable style={[styles.item, styles.fourthItem]}> 
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
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
},
row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
item: {
    backgroundColor: 'white',
    width: '40%',
    height: '40%',
    aspectRatio: 1, // Makes the item square
    margin: 10,
},
image: {
 flex: 1,
 justifyContent: 'center',
 alignContent: 'center',
 height: '100%',
},
text:{
flex: 1,
marginBottom: 0,
},
imagelow: {
    //flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    verticalAlign: 'bottom',
    height: '90%',
    width: '90%',

   },
});