
import React,{useState} from 'react';
import { StyleSheet, Text,TouchableOpacity, Image, View} from 'react-native';
import { theme } from '../core/theme';
import Svg, { Path } from "react-native-svg"
import Button from '../components/Button';
import TextInput from '../components/TextInput';

export default function WelcomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <View style={{marginVertical:'auto'}}>
        <View style={styles.header}>
          <Text style={styles.title}>
           Welcome!
          </Text>
          <Text style={styles.subtitle}>
            Your bank account has been linked and 
          </Text>
          <Text style={styles.subtitle}>
            your account has been created
          </Text>
        </View>
        <Button onPress={()=>{navigation.navigate('LoginScreen');}}  color={theme.colors.backgroundColor} style={styles.mannual}>
           <Text style={styles.bttext}>
            Submit
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.colors.backgroundColor,
    paddingHorizontal:19,
    paddingVertical:45
  },
  header:{
    textAlign:'center',
  },
  title:{
    color:theme.colors.whiteColor,
    fontSize:theme.fontSize.subtitle0,
    fontWeight:theme.fontWeight.bold,
    marginVertical:20
  },
  subtitle:{
    color:theme.colors.whiteColor,
    fontSize:theme.fontSize.content,
    fontWeight:theme.fontWeight.small,
    opacity:0.66,
    letterSpacing:1.5
  },
  iconSend:{
    width:100,
    height:30,
    alignSelf:'center',
    resizeMode: 'contain'
  },
  footer:{
    marginBottom:82,
    textAlign:'center',
    
    fontSize:theme.fontSize.smallSize,
    fontWeight:theme.fontWeight.normal,
  },
  desc:{
    color:theme.colors.whiteColor,
  },
  mannual:{
    backgroundColor:theme.colors.yellowtextColor,
    fontSize:theme.fontSize.subtitle1,
    marginVertical:20,
    paddingVertical:12,
    paddingHorizontal:10,
    borderRadius:10,
  },
  bttext: {
    textAlign:'center',
    fontWeight: theme.fontWeight.bold,
    fontSize: 18,
    lineHeight: 22,
  },
  redir:{
    paddingLeft:5,
    color:theme.colors.thickyellowColor,
  },
  inputgroup:{
    marginBottom:10,
  },
  label: {
    margin: 8,
    color:theme.colors.whiteColor
  },
});
