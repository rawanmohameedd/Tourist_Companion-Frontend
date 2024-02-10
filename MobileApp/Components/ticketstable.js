import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Table = () => {
  return (
    <View style={styles.table}>
      <View style={styles.header}>
        <View style={{width:'25%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>foreign adult</Text></View>
        <View style={{width:'25%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Egyptian adult</Text></View>
        <View style={{width:'25%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Egyptian student</Text></View>
      </View>
      <View style={styles.rowe}>
        <View style={{width:'25%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>300 $</Text></View>
        <View style={{width:'25%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>150 EGP</Text></View>
        <View style={{width:'25%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>50 EGP</Text></View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowo: {
    flexDirection: 'row',
    backgroundColor: '#505251',
  },
  rowe: {
    flexDirection: 'row',
    backgroundColor: '#6e706f',

  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    borderWidth: 0,
    borderColor: '#000',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  header:{
    flexDirection: 'row',
    backgroundColor: '#3d3d3d',

  },
  tebletext:{
    textAlign:'center',
    textAlignVertical:'center',
  }
});

export default Table;