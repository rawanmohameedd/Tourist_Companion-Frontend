import React from 'react';
import { View, Text, StyleSheet, Image , Pressable , ScrollView} from 'react-native';

export default function ProfilePageTG  ({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
        source={require('../../Images/download.jpg')} // Replace with your own image path
        style={styles.profilePicture}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bio}>Nationality</Text>
      </View>

    <View style={styles.Hcontainer}>
        <ScrollView keyboardDismissMode="on-drag">
          <Text style={styles.vhistory}>Visit history</Text>
          <Text style={styles.users}>  Daniel                           5/5</Text>
          <Text style={styles.users}>  Rawan                            4/5</Text>
          <Text style={styles.users}>  Omar                             5/5</Text>
          <Text style={styles.users}>  Tawfik                           3/5</Text>
          <Text style={styles.users}>  Habiba                           2/5</Text>
          <Text style={styles.users}>  Daniel                           5/5</Text>
          <Text style={styles.users}>  Rawan                            4/5</Text>
          <Text style={styles.users}>  Omar                             5/5</Text>
          <Text style={styles.users}>  Tawfik                           3/5</Text>
          <Text style={styles.users}>  Habiba                           2/5</Text>
          <Text style={styles.users}>  Daniel                           5/5</Text>
          <Text style={styles.users}>  Rawan                            4/5</Text>
          <Text style={styles.users}>  Omar                             5/5</Text>
          <Text style={styles.users}>  Tawfik                           3/5</Text>
          <Text style={styles.users}>  Habiba                           2/5</Text>
        </ScrollView>
      </View>

    <Text style={styles.avgrating}>Rating: 4.78/5 </Text>
      

    <View style={styles.container}>
      <Pressable
            onPress={()=> navigation.navigate('Welcome')}
            style={styles.button}>
            <Text style={[styles.buttontext, {fontSize: 20,fontWeight: 'bold'}]}> Sign out </Text>
            </Pressable>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#121212' ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color:'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  vhistory:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  Hcontainer:{
    flex: 1,
    padding: 5,
    backgroundColor: '#6e706f',
    width: 400,
    height: 450,
    marginTop: 70,
  },
  buttontext: {
    color: 'black',
  },
  users:{
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  button: {
    height: 50,
    width: 250,
    padding: 10,
    borderRadius: 300,
    marginTop: 10,
    backgroundColor: '#E2C07C',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avgrating:{
    height: 50,
    width: 150,
    fontWeight:'bold',
    fontSize:20,
    padding: 10,
    borderRadius: 300,
    marginTop: 10,
    textAlign:'center',
    backgroundColor: '#6e706f',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
