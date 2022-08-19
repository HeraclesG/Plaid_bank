
import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text,ScrollView , View} from 'react-native';
import { theme } from '../core/theme';
export default function HomeScreen({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>

      </View>
      <View style={styles.body}>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.colors.backgroundColor,
  },
  header:{
    height:350,
  },
  body:{
    backgroundColor:theme.colors.whiteColor
  }
});
