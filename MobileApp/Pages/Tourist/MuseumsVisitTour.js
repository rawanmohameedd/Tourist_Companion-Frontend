import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

export default function VisitTour  (){
    return(
    <View style={styles.container}>
    <View style={styles.row}>
        <Pressable style={[styles.item, styles.firstItem]}> 
        <Text>Track your guide</Text>
        </Pressable> 
        <Pressable style={[styles.item, styles.secondItem]}> 
        <Text>Read monument labels</Text>
        </Pressable> 
    </View>
    <View style={styles.row}>
        <Pressable style={[styles.item, styles.thirdItem]}> 
        <Text>Tour guide data</Text>
        </Pressable> 
        <Pressable style={[styles.item, styles.fourthItem]}> 
        <Text>Check Crowded rooms</Text>
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
},
row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
item: {
    backgroundColor: 'lightblue',
    width: '40%',
    aspectRatio: 1, // Makes the item square
    margin: 10,
},
});


