import React from "react";
import {
  View,
  FlatList,
  Pressable,
  Image,
  Text,
  StyleSheet
} from "react-native";

const data = [
  {
    id: "1",
    imageSource: require("../Images/Egyption-museums.jpg"),
    caption: "The Egyptian museum"
  },
  {
    id: "2",
    imageSource: require("../Images/grand-egyprion-museum.jpg"),
    caption: "The Grand Egyptian Museum"
  },
  {
    id: "3",
    imageSource: require("../Images/Pyramids.jpg"),
    caption: "Pyramids"
  },
  {
    id: "4",
    imageSource: require("../Images/National-musuem-og-civilization.jpg"),
    caption: "The National Museum of Egyptian Civilization"
  },
  {
    id: "5",
    imageSource: require("../Images/Nubia-museum.jpg"),
    caption: "Nubia Museum"
  },
  {
    id: "6",
    imageSource: require("../Images/Coptic-museum.jpg"),
    caption: "The Coptic Museum"
  }
];

const renderItem = ({ item }) => {
  return (
    <Pressable
      style={styles.item}
    >
      <Image source={item.imageSource} style={styles.image} />
      <Text style={styles.caption}>{item.caption}</Text>
    </Pressable>
  );
};

const GridComponent = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    flex: 1,
    aspectRatio: 1,
    margin: 10,
    alignItems: "center"
  },
  image: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: "cover"
  },
  caption: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default GridComponent;