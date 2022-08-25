import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { View, Image, Text } from 'react-native-web'
import { theme } from '../core/theme'

export default function ProfilelistCard({item}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.avatar} source={require('../assets/'+item.avatar)} />
        <Text style={styles.name}>
            {item.name}
        </Text>
      </View>
      <View style={styles.underline}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginVertical:10,
  },
  avatar:{
    width:20,
    height:20,
 },
 row:{
  marginVertical:10,
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
 },
 name:{
  color:theme.colors.backgroundColor,
  fontSize:theme.fontSize.content0,
  fontWeight:theme.fontWeight.normal,
  paddingLeft:10,
 },
 date:{
  color:theme.colors.lightgreytextColor,
  fontSize:theme.fontSize.content,
  fontWeight:theme.fontWeight.normal
 },
 money:{
  color:theme.colors.lightgreytextColor,
  fontSize:theme.fontSize.content0,
  fontWeight:theme.fontWeight.normal
 },
 underline:{
  marginTop:5,
  marginLeft:20,
  backgroundColor:theme.colors.underlineColor,
  height:1,
 }
})