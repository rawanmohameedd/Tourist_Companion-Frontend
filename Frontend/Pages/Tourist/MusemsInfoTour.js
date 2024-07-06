import React, { useState, useEffect } from "react";
import { View, FlatList, Pressable, ImageBackground, Text, StyleSheet, RefreshControl } from "react-native";
import server from "../../elserver";

const GridComponent = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await fetch(`${server}/museums`);
      if (!response.ok) {
        throw new Error('Failed to fetch list');
      }
      const responseData = await response.json();
      console.log('all museums',responseData)
      const museumNames = responseData.map(museum => {
        console.log(`${server}/${museum.musuem_image}`);
        return {
          id: museum.musid.toString(),
          imageSource: { uri: `${server}/${museum.musuem_image}` },
          caption: museum.museum_name
        };
      });
      setData(museumNames);
      setRefreshing(false); 
    } catch (error) {
      console.log(error.message);
    } 
  };
  

  const onRefresh = () => {
    setRefreshing(true);
    fetchList();
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.item} onPress={() => navigation.navigate('Info page', { musid: item.id })}>
        <ImageBackground
          style={styles.image}
          resizeMode="contain"
          source={item.imageSource}
        >
          <Text style={styles.caption}>{item.caption}</Text>
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.component}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ffffff']}
            progressBackgroundColor="#121212"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  image: {
    width: 400,
    height: 210,
    resizeMode: "contain",
    flex: 1,
  },
  caption: {
    fontSize: 25,
    fontWeight: "bold",
    color: 'white',
    textAlign: 'right',
    textAlignVertical: 'bottom',
    flex: 1,
    textShadowColor: 'black',
    textShadowRadius: 20,
  },
  component: {
    backgroundColor: '#121212',
  },
});

export default GridComponent;
