import React from "react";
import { View, FlatList, Pressable, Image, Text, StyleSheet,ImageBackground} from "react-native";
import infoPage from "./../infopage"

const data = [
  {
    id: "6",
    imageSource: require("../../Images/Museums_image/National-musuem-og-civilization.jpg"),
    caption: "The National Museum of Egyptian Civilization"
  },
  {
    id: "5",
    imageSource: require("../../Images/Museums_image/grand-egyprion-museum.jpg"),
    caption: "The Grand Egyptian Museum"
  },
  {
    id: "4",
    imageSource: require("../../Images/Museums_image/Pyramids.jpg"),
    caption: "Pyramids"
  },
  {
    id: "3",
    imageSource: require("../../Images/Museums_image/Egyption-museums.jpg"),
    caption: "The Egyptian museum"
  },
  {
    id: "2",
    imageSource: require("../../Images/Museums_image/Nubia-museum.jpg"),
    caption: "Nubian Museum"
  },
  {
    id: "1",
    imageSource: require("../../Images/Museums_image/Coptic-museum.jpg"),
    caption: "The Coptic Museum"
  }
];

const renderItem = ({item, navigation}) => {
  return (
    <Pressable style={styles.item} onPress={() => navigation.navigate('Info page', {musid: item.id})}>
      
      <ImageBackground 
        style={styles.image}
        resizeMode={'contain'}
        source={item.imageSource}
      >
        <Text style={styles.caption}> {item.caption} </Text>
      </ImageBackground>  
    </Pressable>
  );
};


const GridComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.component}
        data={data}
        renderItem={(item) => renderItem({ ...item, navigation })}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

/*const GridComponent = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.component}
        data={data} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};*/

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#121212"
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    width: '100%',
    height: 'auto',
    margin: 5,
    alignItems: "center",
    verticalAlign: 'middle',

  },
  image: {
    width: 400,
    height: 210,
    resizeMode: "contain",
    flex: 1,

  },
  caption: {
    //marginTop: 1,
    fontSize: 25,
    fontWeight: "bold",
    color: 'white',
    textAlign: 'right',
    textAlignVertical: 'bottom',
    flex: 1,
    textShadowColor: 'black',
    textShadowRadius: 20,

  },
  component:{
    backgroundColor: '#121212',
  },

});

export default GridComponent;