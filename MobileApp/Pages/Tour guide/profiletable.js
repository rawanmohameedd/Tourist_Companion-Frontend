import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import server from '../../elserver';

const Table = () => {
  return (
    <View style={styles.table}>
      <View style={styles.header}>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Tourist</Text></View>
        <View style={{width:'45%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Place</Text></View>
        <View style={{width: '20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Date</Text></View>
        <View style={{width: '15%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Rating</Text></View>
      </View>
      <View style={styles.rowe}>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Anas</Text></View>
        <View style={{width:'45%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Egyptian civilization Museum</Text></View>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>11-1-2023</Text></View>
        <View style={{width:'15%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>5/5</Text></View>
      </View>
      <View style={styles.rowo}>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Hussien</Text></View>
        <View style={{width:'45%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Nubian Museum</Text></View>
        <View style={{width: '20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>11-2-2023</Text></View>
        <View style={{width: '15%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>4/5</Text></View>
      </View>
      <View style={styles.rowe}>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Tawfik</Text></View>
        <View style={{width:'45%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Idfu temple</Text></View>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>1-4-2023</Text></View>
        <View style={{width:'15%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>1/5</Text></View>
      </View>
      <View style={styles.rowo}>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Rawan</Text></View>
        <View style={{width:'45%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Moez street</Text></View>
        <View style={{width: '20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>21-4-2023</Text></View>
        <View style={{width: '15%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>5/5</Text></View>
      </View>
      <View style={styles.rowe}>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Toka</Text></View>
        <View style={{width:'45%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Pyrmids</Text></View>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>21-5-2023</Text></View>
        <View style={{width:'15%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>4/5</Text></View>
      </View>
      <View style={styles.rowo}>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Daniel</Text></View>
        <View style={{width:'45%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Pyrmids</Text></View>
        <View style={{width: '20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>1-6-2023</Text></View>
        <View style={{width: '15%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>5/5</Text></View>
      </View>
      <View style={styles.rowe}>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Habiba</Text></View>
        <View style={{width:'45%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Moez street</Text></View>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>1-7-2023</Text></View>
        <View style={{width:'15%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>3/5</Text></View>
      </View>
      <View style={styles.rowo}>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Norhan</Text></View>
        <View style={{width:'45%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Pyrmids</Text></View>
        <View style={{width: '20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>31-8-2023</Text></View>
        <View style={{width: '15%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>2/5</Text></View>
      </View>
      <View style={styles.rowe}>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Omar</Text></View>
        <View style={{width:'45%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>Egyptian civilization Museum</Text></View>
        <View style={{width:'20%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>6-10-2023</Text></View>
        <View style={{width:'15%',flexDirection:'row',justifyContent:'center'}}><Text style={styles.tebletext}>2/5</Text></View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#6e706f',
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