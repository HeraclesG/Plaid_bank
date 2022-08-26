import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { View, Image, Text } from 'react-native-web'
import { theme } from '../core/theme'

export default function HelpCard({item}) {
  return (
    <View style={styles.container}>
      <View style={styles.avatergroup}>
        <Image resizeMode='stretch' style={styles.avatar} source={require('../assets/avatar.jpg')} />
        <View style={styles.dategroup}>
          <Text style={styles.name}>
            {item.name}
          </Text>
          <Text style={styles.date}>
            {item.email}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginVertical:5,
    backgroundColor:theme.colors.whiteColor,
    padding:14,
    borderRadius:5
  },
  avatar:{
      width:53,
      height:37,
      borderRadius:4,
      backgroundColor:theme.colors.backgroundColor
  },
 avatergroup:{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
 },
 dategroup:{
  display:'flex',
  flexDirection:'column',
  marginLeft:15,
 },
 name:{
  color:theme.colors.blackColor,
  fontSize:theme.fontSize.content0,
  fontWeight:theme.fontWeight.normal
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
  marginTop:10,
  backgroundColor:theme.colors.underlineColor,
  height:1,
 }
})